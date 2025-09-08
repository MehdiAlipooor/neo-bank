import prisma from "../../../../../lib/db/prisma";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { ILedgerRepository } from "../../application/ports/ledger-repository.port";
import { TransferEntity } from "../../domain/entities/Transfer.entity";
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

	async createLedgerTxWithEntry(params: {
		txId: string;
		transferId?: string | null;
		type: string;
		entry: {
			id: string;
			walletId?: string | null;
			account: string;
			amount: Money;
			metadata?: any;
		};
	}): Promise<void> {
		await prisma.$transaction(async (tx) => {
			await tx.ledgerTransaction.create({
				data: {
					id: params.txId,
					transferId: params.transferId,
					type: params.type,
					ledgerEntries: {
						create: {
							id: params.entry.id,
							walletId: params.entry.walletId,
							account: params.entry.account,
							amount: params.entry.amount.value,
							metadata: params.entry.metadata || null,
						},
					},
				},
			});
		});
	}

	async findTransferById(id: string): Promise<TransferEntity | null> {
		const rec = await prisma.transfer.findUnique({ where: { id } });
		if (!rec) return null;

		return {
			id: rec.id,
			idempotencyKey: rec.idempotencyKey,
			type: rec.type as any,
			amount: rec.amount,
			//   currency: rec.currency,
			sourceWalletId: rec.sourceWalletId,
			destIdentifier: rec.destIdentifier,
			status: rec.status as any,
			//   externalRef: rec.externalRef,
			metadata: rec.metadata,
			createdAt: rec.createdAt,
			updatedAt: rec.updatedAt,
		};
	}

	async findTransferByIdempotencyKey(
		idempotencyKey: string,
	): Promise<TransferEntity | null> {
		const rec = await prisma.transfer.findUnique({ where: { idempotencyKey } });
		if (!rec) return null;

		return {
			id: rec.id,
			idempotencyKey: rec.idempotencyKey,
			type: rec.type as any,
			amount: rec.amount,
			sourceWalletId: rec.sourceWalletId,
			destIdentifier: rec.destIdentifier,
			status: rec.status as any,
			metadata: rec.metadata,
			createdAt: rec.createdAt,
			updatedAt: rec.updatedAt,
		};
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

	async findAllCreatedTransfers(limit?: number): Promise<TransferEntity[]> {
		const rows = await prisma.transfer.findMany({
			where: { status: "CREATED" },
			orderBy: { createdAt: "asc" },
			take: limit,
		});

		return rows.map((r) => ({
			id: r.id,
			idempotencyKey: r.idempotencyKey,
			type: r.type as any,
			amount: r.amount,
			currency: r.currency,
			sourceWalletId: r.sourceWalletId,
			destIdentifier: r.destIdentifier,
			status: r.status as any,
			externalRef: r.externalRef,
			metadata: r.metadata,
			createdAt: r.createdAt,
			updatedAt: r.updatedAt,
		}));
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
					status: "CREATED",
				},
			});

			// 2️⃣ LedgerTransaction
			await tx.ledgerTransaction.create({
				data: {
					id: txId,
					transferId: id,
					type: "deposit",
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
				},
			});
		});
	}
}
