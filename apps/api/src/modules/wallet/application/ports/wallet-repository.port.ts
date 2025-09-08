import type { Wallet } from "../../domain/entities/wallet";

export interface IWalletRepository {
	create(wallet: Wallet): Promise<Wallet>;
	findById(id: string): Promise<Wallet | null>;
	findByUserId(userId: string): Promise<Wallet | null>;
	update(wallet: Wallet): Promise<Wallet>;
}
