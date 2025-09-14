import { ConcreteLedgerTransaction } from "../../domain/entities/concrete-ledger-transaction.entity";

export class LedgerFactory {
	static createLedgerTransaction(type: "DEPOSIT" | "WITHDRAW" | "INTERNAL") {
		return new ConcreteLedgerTransaction(
			crypto.randomUUID(),
			`ledgerTx-${Date.now()}`,
			type,
		);
	}
}
