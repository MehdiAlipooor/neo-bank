import type { LedgerEntry } from "../../domain/entities/ledger-entry.entity";

export interface ILedgerRepository {
	createEntry(ledger: LedgerEntry, tx?: any): Promise<void>;

	createTransactionEntries(
		txId: string,
		entries: LedgerEntry[],
		tx?: any,
	): Promise<void>;
}
