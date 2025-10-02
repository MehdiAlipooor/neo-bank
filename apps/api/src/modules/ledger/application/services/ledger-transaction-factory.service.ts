import { randomUUID } from "node:crypto";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { ConcreteLedgerTransaction } from "../../domain/entities/concrete-ledger-transaction.entity";
import { LedgerEntry } from "../../domain/entities/ledger.entity";
import type { LedgerTransactionStatus } from "../../domain/enums/ledger-transaction-status.enum";

// biome-ignore lint/complexity/noStaticOnlyClass: <We need this here>
export class LedgerTransactionFactory {
	static createLedgerTransaction(
		type: "DEPOSIT" | "WITHDRAW" | "INTERNAL",
		wallet: Wallet,
		amount: number,
		status: LedgerTransactionStatus,
		transferKey: string,
	) {
		const ledgerTxKey = `ledgerTx-${Date.now()}`;

		const tx = new ConcreteLedgerTransaction(
			randomUUID(),
			ledgerTxKey,
			type,
			status,
			transferKey,
		);

		const entries = new LedgerEntry(
			randomUUID(),
			ledgerTxKey,
			"WALLET",
			amount,
			type,
			wallet.walletKey,
		);

		tx.ledgerEntries.push(entries);

		return tx;
	}
}
