import { randomUUID } from "node:crypto";
import { LedgerEntry } from "../../domain/entities/ledger-entry.entity";
import type { IHoldRepository } from "../ports/hold.repository.port";
import type { ITransferRepository } from "../ports/transfer-repository.port";
import type { ILedgerRepository } from "../ports/ledger.repository.port";

export class CommitHoldUseCase {
	constructor(
		private transferRepo: ITransferRepository,
		private holdRepo: IHoldRepository,
		private ledgerRepo: ILedgerRepository,
	) {}

	async execute(holdId: string, tx?: any) {
		const hold = await this.holdRepo.findById(holdId, tx);
		if (!hold) {
			throw new Error("hold_not_found");
		}

		hold.consume();

		const wallet = await this.transferRepo.findById(hold.walletId);
		if (!wallet) {
			throw new Error("wallet_not_found");
		}

		// substract balance from wallet amount
		wallet.balance = wallet.balance.subtract(hold.amount);

		// create ledger entry (debit wallet, credit settlement account)
		const debit = new LedgerEntry(
			randomUUID(),
			wallet.id,
			hold.amount,
			"WALLET",
			hold.id,
		);
		const credit = new LedgerEntry(
			randomUUID(),
			null,
			hold.amount,
			"SETTLEMENT",
			hold.id,
		);

		await this.holdRepo.update(hold, tx);
		await this.transferRepo.save(wallet, tx);
		await this.ledgerRepo.createTransactionEntries(
			randomUUID(),
			[debit, credit],
			tx,
		);

		return hold;
	}
}
