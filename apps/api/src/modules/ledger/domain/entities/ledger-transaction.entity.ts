import { LedgerEntry } from "./ledger.entity";

export abstract class LedgerTransaction {
	id: string;
	ledgerTxKey: string;
	type: string;
	createdAt: Date;
	ledgerEntries: LedgerEntry[] = [];

	constructor(id: string, ledgerTxKey: string, type: string) {
		this.id = id;
		this.ledgerTxKey = ledgerTxKey;
		this.type = type;
		this.createdAt = new Date();
	}

	abstract addEntry(entry: LedgerEntry): void;
}
