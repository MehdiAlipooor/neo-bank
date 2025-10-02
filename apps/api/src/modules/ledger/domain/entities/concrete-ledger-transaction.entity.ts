import { LedgerTransaction } from "./ledger-transaction.entity";
import type { LedgerEntry } from "./ledger.entity";

export class ConcreteLedgerTransaction extends LedgerTransaction {
	addEntry(entry: LedgerEntry): void {
		this.ledgerEntries.push(entry);
	}
}
