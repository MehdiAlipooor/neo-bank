import type { IHoldRepository } from "../ports/hold.repository.port";
import type { ITransferRepository } from "../ports/transfer-repository.port";

export class ReleaseHoldUseCase {
	constructor(
		private transferRepo: ITransferRepository,
		private holdRepo: IHoldRepository,
	) {}

	async execute(holdId: string, tx?: any) {
		const hold = await this.holdRepo.findById(holdId, tx);
		if (!hold) {
			throw new Error("hold_not_found");
		}

		hold.release();

		const wallet = await this.transferRepo.findById(hold.walletId, tx);
		if (!wallet) {
			throw new Error("wallet_not_found");
		}

		wallet.releaseHold(hold.amount);

		await this.holdRepo.update(hold, tx);
		await this.transferRepo.save(wallet);

		return hold;
		// const hold
		// wallet.releaseHold()
	}
}
