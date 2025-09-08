import { randomUUID } from "node:crypto";
import { Hold } from "../../domain/entities/hold.entity";
import { Money } from "../../domain/value-objects/Money";
import type { IHoldRepository } from "../ports/hold.repository.port";
import type { ITransferRepository } from "../ports/transfer-repository.port";

export class CreateHoldUseCase {
	constructor(
		private walletRepo: ITransferRepository,
		private holdRepo: IHoldRepository,
	) {}

	async execute(walletId: string, amountNumber: number, tx?: any) {
		const wallet = await this.walletRepo.findById(walletId, tx);
		if (!wallet) {
			throw new Error("wallet_not_found");
		}

		const amount = new Money(amountNumber);
		wallet.applyHold(amount);

		// Save wallet and hold in same transaction (tx passed down by caller)
		await this.walletRepo.save(wallet, tx);

		// Create new hold
		const hold = new Hold(randomUUID(), walletId, amount);
		return await this.holdRepo.create(hold);
	}
}
