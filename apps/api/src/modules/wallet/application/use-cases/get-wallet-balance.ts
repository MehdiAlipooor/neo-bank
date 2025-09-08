import type { IWalletRepository } from "../ports/wallet-repository.port";

export class GetWalletBalance {
	constructor(private readonly walletRepo: IWalletRepository) {}

	async execute(walletId: string): Promise<number> {
		const wallet = await this.walletRepo.findById(walletId);
		if (!wallet) throw new Error("Wallet not found");
		return wallet.getBalance();
	}
}
