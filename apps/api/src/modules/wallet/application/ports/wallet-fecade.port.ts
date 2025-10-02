import type { Prisma } from "@prisma/client";
import type { Wallet } from "../../domain/entities/wallet";

export interface WalletFecadePort {
	findByKey(walletKey: string): Promise<Wallet | null>;
	updateAmount(
		walletKey: string,
		balance: number,
		available: number,
		tx: Prisma.TransactionClient,
	): Promise<void>;
}
