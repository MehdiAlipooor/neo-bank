import type { LedgerTransactionType, Prisma } from "@prisma/client";
import type { LedgerRepositoryPort } from "../../application/ports/ledger-repository.port";
import type { LedgerTransaction } from "../../domain/entities/ledger-transaction.entity";
import type { LedgerTransactionStatus } from "../../domain/enums/ledger-transaction-status.enum";

export class LedgerRepository implements LedgerRepositoryPort {
	async updateTransactionStatus(
		transferKey: string,
		status: LedgerTransactionStatus,
		tx: Prisma.TransactionClient,
	): Promise<LedgerTransaction> {
		return (await tx.ledgerTransaction.update({
			where: { transferKey },
			data: { status },
			include: { ledgerEntries: true },
		})) as unknown as LedgerTransaction;
	}

	async saveTransaction(
		ledgerTx: LedgerTransaction,
		tx: Prisma.TransactionClient,
	): Promise<void> {
		await tx.ledgerTransaction.create({
			data: {
				id: ledgerTx.id,
				type: ledgerTx.type as LedgerTransactionType,
				ledgerTxKey: ledgerTx.ledgerTxKey,
				createdAt: ledgerTx.createdAt,
				transferKey: ledgerTx.transferKey,

				ledgerEntries: {
					create: ledgerTx?.ledgerEntries?.map((entry) => ({
						id: entry.id,
						ledgerEntryKey: entry.ledgerEntryKey,
						walletKey: entry.walletKey,
						account: entry.account,
						amount: entry.amount,
						type: entry.type,
						metadata: entry.metadata,
						createdAt: entry.createdAt,
					})) as any,
				},
			},
		});
	}
}
