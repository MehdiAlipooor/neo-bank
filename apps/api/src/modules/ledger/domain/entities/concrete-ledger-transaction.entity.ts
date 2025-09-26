import type { LedgerEntry } from "./ledger.entity";
import { LedgerTransaction } from "./ledger-transaction.entity";

export class ConcreteLedgerTransaction extends LedgerTransaction {
	addEntry(entry: LedgerEntry): void {
		this.ledgerEntries.push(entry);
	}
}
