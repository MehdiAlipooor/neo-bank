import type { Wallet } from "../../domain/entities/wallet";

export interface ITransferRepository {
	save(wallet: Wallet, tx?: any): Promise<Wallet>;

	// note: tx param is optional for implementations that support transaction client
	findById(walletId: string, tx?: any): Promise<Wallet | null>;
}
