import prisma from "../../../../../lib/db/prisma";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { ILedgerRepository } from "../../application/ports/ledger-repository.port";
import {
	LedgerEntry,
	LedgerTransactionType,
} from "../../domain/entities/ledger-entry.entity";
import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { TransferTypes } from "../../domain/enums/transfer.enum";

export class LedgerRepository implements ILedgerRepository {
	async createTransfer(transfer: {
		id: string;
		type: TransferTypes;
		amount: Money;
		sourceWalletId: string;
		destIdentifier?: string | null;
		metadata?: any;
		idempotencyKey: string;
	}): Promise<void> {
		await prisma.transfer.create({
			data: {
				id: transfer.id,
				type: transfer.type as any,
				amount: transfer.amount.value,
				sourceWalletId: transfer.sourceWalletId,
				destIdentifier: transfer.destIdentifier,
				metadata: transfer.metadata,
				idempotencyKey: transfer.idempotencyKey,
			},
		});
	}

	async createLedgerTxWithEntry(
		params: {
			txId: string;
			transferId?: string | null;
			type: LedgerTransactionType;
			entries: LedgerEntry[];
		},
		transactionRef: any,
	): Promise<void> {
		await transactionRef.ledgerTransaction.create({
			data: {
				id: params.txId,
				transferId: params.transferId,
				type: params.type,
				ledgerEntries: {
					create: params.entries.map((entry) => ({
						id: entry.id,
						walletId: entry.walletId,
						account: entry.account,
						amount: entry.amount.value,
						metadata: entry.metadata || {},
						type: LedgerTransactionType.TRANSFER,
					})),
				},
			},
		});
		// });
	}

	async findTransferById(id: string): Promise<Transfer | null> {
		const record = await prisma.transfer.findUnique({ where: { id } });
		if (!record) return null;

		return new Transfer(
			record.id,
			record.type as any,
			Number(record.amount),
			record.sourceWalletId,
			record.destIdentifier,
			record.status as any,
			record.idempotencyKey,
			record.metadata,
			record.createdAt,
			record.updatedAt,
		);
	}

	async findTransferByIdempotencyKey(
		idempotencyKey: string,
	): Promise<Transfer | null> {
		const record = await prisma.transfer.findUnique({
			where: { idempotencyKey },
		});
		if (!record) return null;

		return new Transfer(
			record.id,
			record.type as any,
			Number(record.amount),
			record.sourceWalletId,
			record.destIdentifier,
			record.status as any,
			record.idempotencyKey,
			record.metadata,
			record.createdAt,
			record.updatedAt,
		);
	}

	async updateTransferStatus(
		id: string,
		status: TransferStatus,
	): Promise<void> {
		await prisma.transfer.update({
			where: { id },
			data: { status: status as any },
		});
	}

	async createDepositTransaction({
		id,
		walletId,
		amount,
		idempotencyKey,
		txId,
	}: {
		id: string;
		walletId: string;
		amount: Money;
		idempotencyKey: string;
		txId: string;
	}) {
		await prisma.$transaction(async (tx) => {
			// 1️⃣ Transfer
			await tx.transfer.create({
				data: {
					id,
					type: "DEPOSIT",
					amount: amount.value,
					sourceWalletId: walletId,
					idempotencyKey,
					status: TransferStatus.CREATED,
				},
			});

			// 2️⃣ LedgerTransaction
			await tx.ledgerTransaction.create({
				data: {
					id: txId,
					transferId: id,
					type: LedgerTransactionType.TRANSFER,
				},
			});

			// 3️⃣ LedgerEntry
			await tx.ledgerEntry.create({
				data: {
					id: crypto.randomUUID(),
					txId,
					walletId,
					account: `wallet:${walletId}`,
					amount: amount.value,
					metadata: { note: "init deposit pending" },
					type: LedgerTransactionType.DEPOSIT,
				},
			});
		});
	}
}
