import { WalletRepository } from "../../infrastructure/repositories/wallet.repository";
import type { WalletFecadePort } from "../ports/wallet-fecade.port";
import type { WalletRepositoryPort } from "../ports/wallet-repository.port";

export class WalletFecad implements WalletFecadePort {
	private repo: WalletRepositoryPort;
	constructor() {
		this.repo = new WalletRepository();
	}

	async findByKey(walletKey: string) {
		const record = await this.repo.findByWalletKey(walletKey);
		return record ?? null;
	}
}
