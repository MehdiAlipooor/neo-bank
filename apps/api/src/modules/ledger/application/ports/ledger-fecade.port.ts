import type { Prisma } from "@prisma/client";
import type { LedgerTransaction } from "../../domain/entities/ledger-transaction.entity";
import type { LedgerTransactionStatus } from "../../domain/enums/ledger-transaction-status.enum";

export interface LedgerFecadePort {
	saveTransaction(
		ledgerTx: LedgerTransaction,
		tx: Prisma.TransactionClient,
	): Promise<void>;

	updateTransactionStatus(
		transferKey: string,
		status: LedgerTransactionStatus,
		tx: Prisma.TransactionClient,
	): Promise<LedgerTransaction>;
}
