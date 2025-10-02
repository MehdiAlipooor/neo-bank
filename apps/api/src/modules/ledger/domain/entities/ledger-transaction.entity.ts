import type { LedgerTransactionStatus } from "../enums/ledger-transaction-status.enum";
import type { LedgerEntry } from "./ledger.entity";

export abstract class LedgerTransaction {
	id: string;
	ledgerTxKey: string;
	type: string;
	createdAt: Date;
	ledgerEntries: LedgerEntry[] = [];
	status: LedgerTransactionStatus = "PENDING";
	transferKey: string;

	constructor(
		id: string,
		ledgerTxKey: string,
		type: string,
		status: LedgerTransactionStatus,
		transferKey: string,
	) {
		this.id = id;
		this.ledgerTxKey = ledgerTxKey;
		this.type = type;
		this.createdAt = new Date();
		this.status = status;
		this.transferKey = transferKey;
	}

	abstract addEntry(entry: LedgerEntry): void;
}
