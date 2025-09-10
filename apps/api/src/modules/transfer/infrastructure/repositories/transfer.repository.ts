import { TransferType } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import { Wallet } from "../../../wallet/domain/entities/wallet";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { ITransferRepository } from "../../application/ports/transfer-repository.port";
import { Hold } from "../../domain/entities/hold.entity";
import {
	LedgerEntry,
	LedgerTransactionType,
} from "../../domain/entities/ledger-entry.entity";
import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { TransferTypes } from "../../domain/enums/transfer.enum";
import { HoldStatus } from "../../domain/value-objects/hold-status.vo";

export class TransferRepository implements ITransferRepository {
	async create(transfer: Transfer, transactionRef?: any): Promise<void> {
		const dbClient = transactionRef ?? prisma;
		await transactionRef.transfer.create({
			data: {
				id: transfer.id,
				sourceWalletId: transfer.sourceWalletId,
				destIdentifier: transfer.destIdentifier,
				amount: transfer.amount,
				status: TransferStatus.CREATED,
				idempotencyKey: transfer.idempotencyKey,
				metadata: transfer.metadata || {},
				type: TransferType.INTERNAL,
			},
		});
	}

	async findByIdempotencyKey(key: string): Promise<Transfer | null> {
		const record = await prisma.transfer.findUnique({
			where: { idempotencyKey: key },
		});
		if (!record) {
			return null;
		}

		return new Transfer(
			record.id,
			record.type as TransferTypes,
			record.amount as any,
			record.sourceWalletId,
			record.destIdentifier,
			record.status as TransferStatus,
			record.idempotencyKey!,
			record.metadata ?? {},
		);
	}

	async updateStatus(id: string, status: TransferStatus) {
		await prisma.transfer.update({
			where: { id },
			data: { status: status as any },
		});
	}

	async getTransaction(callback: (trasaction: any) => any) {
		return prisma.$transaction(async (tx) => {
			return callback(tx); // tx is valid only inside this callback
		  });
	}

	async transferBetweenWallets(
		sourceWallet: Wallet,
		destWallet: Wallet,
		transfer: Transfer,
		amount: Money,
		hold: Hold,
		ledgerEntries: LedgerEntry[],
	): Promise<void> {
		await prisma.$transaction(async (tx) => {
			// 1️⃣ Create hold
			await tx.hold.create({
				data: {
					id: hold.id,
					walletId: hold.walletId,
					amount: hold.amount.value,
					status: hold.status,
					transferId: transfer.id,
				},
			});

			// 2️⃣ Debit source wallet
			await tx.wallet.update({
				where: { id: sourceWallet.id },
				data: {
					balance: { decrement: amount.value },
					available: { decrement: sourceWallet.getAvailableBalance().value },
				},
			});

			// 3️⃣ Credit destination wallet
			await tx.wallet.update({
				where: { id: destWallet.id },
				data: {
					balance: { increment: amount.value },
					available: { increment: destWallet.getAvailableBalance().value },
				},
			});

			// 4️⃣ Persist transfer
			await tx.transfer.create({
				data: {
					id: transfer.id,
					sourceWalletId: sourceWallet.id,
					destIdentifier: destWallet.id,
					amount: transfer.amount,
					status: transfer.status as any,
					idempotencyKey: transfer.idempotencyKey,
					metadata: transfer.metadata || {},
					type: "INTERNAL",
				},
			});

			// 5️⃣ Persist ledger transaction and entries
			const txId = crypto.randomUUID();
			await tx.ledgerTransaction.create({
				data: {
					id: txId,
					transferId: transfer.id,
					type: LedgerTransactionType.TRANSFER,
					ledgerEntries: {
						create: ledgerEntries.map((e) => ({
							id: e.id,
							walletId: e.walletId,
							account: e.account,
							amount: e.amount.value,
							metadata: e.metadata || {},
							createdAt: e.createdAt,
							type: LedgerTransactionType.TRANSFER,
						})),
					},
				},
			});

			// 6️⃣ Mark hold as consumed
			await tx.hold.update({
				where: { id: hold.id },
				data: { status: HoldStatus.CONSUMED },
			});
		});

		// Update Wallet balances
		// const _sourceWallet = await tx.wallet.update({
		// 	where: { id: sourceWallet.id },
		// 	data: {
		// 		balance: sourceWallet.balance.value,
		// 		available: sourceWallet.available.value,
		// 	},
		// });
		// await tx.wallet.update({
		// 	where: { id: destWallet.id },
		// 	data: {
		// 		balance: destWallet.balance.value,
		// 		available: destWallet.available.value,
		// 	},
		// });

		// // Create Transfer record
		// await tx.transfer.create({
		// 	data: {
		// 		id: transfer.id,
		// 		sourceWalletId: sourceWallet.id,
		// 		destIdentifier: destWallet.id,
		// 		amount: transfer.amount,
		// 		status: transfer.status as any,
		// 		idempotencyKey: transfer.idempotencyKey,
		// 		metadata: transfer.metadata || {},
		// 		type: "INTERNAL",
		// 	},
		// });

		// // Create Holds
		// for (const hold of holds) {
		// 	await tx.hold.create({
		// 		data: {
		// 			id: hold.id,
		// 			walletId: hold.walletId,
		// 			amount: hold.amount.value,
		// 			status: hold.status,
		// 			transferId: transfer.id,
		// 		},
		// 	});
		// }

		// // Create LedgerTransaction and Entries
		// const txId = crypto.randomUUID();
		// await tx.ledgerTransaction.create({
		// 	data: {
		// 		id: txId,
		// 		transferId: transfer.id,
		// 		type: "TRANSFER",
		// 		ledgerEntries: {
		// 			create: ledgerEntries.map((e) => ({
		// 				id: e.id,
		// 				walletId: e.walletId,
		// 				account: e.account,
		// 				amount: e.amount.value,
		// 				metadata: e.metadata ?? {},
		// 				createdAt: e.createdAt,
		// 				type: LedgerTransactionType.TRANSFER,
		// 			})),
		// 		},
		// 	},
		// });
	}
}
