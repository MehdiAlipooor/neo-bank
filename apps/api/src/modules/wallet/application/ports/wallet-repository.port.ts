import type { MainWallet } from "../../domain/entities/main-wallet.entity";

export interface WalletRepositoryPort {
	create(wallet: MainWallet): Promise<MainWallet>;
	findById(id: string): Promise<MainWallet | null>;
	findByUserId(userId: string): Promise<MainWallet | null>;
	update(wallet: MainWallet): Promise<MainWallet>;
}
