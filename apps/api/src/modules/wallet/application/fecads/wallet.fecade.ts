import type { Prisma } from "@prisma/client";
import { WalletRepository } from "../../infrastructure/repositories/wallet.repository";
import type { WalletFecadePort } from "../ports/wallet-fecade.port";
import type { WalletRepositoryPort } from "../ports/wallet-repository.port";

export class WalletFecade implements WalletFecadePort {
	private repo: WalletRepositoryPort;
	constructor() {
		this.repo = new WalletRepository();
	}

	async updateAmount(
		walletKey: string,
		balance: number,
		available: number,
		tx: Prisma.TransactionClient,
	): Promise<void> {
		await tx.wallet.update({
			where: { walletKey },
			data: {
				balance: { increment: balance },
				available: { increment: available },
			},
		});
	}

	async findByKey(walletKey: string) {
		const record = await this.repo.findByWalletKey(walletKey);
		return record ?? null;
	}
}
