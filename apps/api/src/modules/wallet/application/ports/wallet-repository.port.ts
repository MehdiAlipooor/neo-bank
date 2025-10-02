import type { MainWallet } from "../../domain/entities/main-wallet.entity";
import type { Wallet } from "../../domain/entities/wallet";

export interface WalletRepositoryPort {
	create(wallet: Wallet): Promise<Wallet>;
	findById(id: string): Promise<MainWallet | null>;
	findByUserId(userId: string): Promise<MainWallet | null>;
	findByWalletKey(walletKey: string): Promise<MainWallet | null>;
	update(wallet: MainWallet): Promise<MainWallet>;
}
