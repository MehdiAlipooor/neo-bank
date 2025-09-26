import type { Wallet } from "../../domain/entities/wallet";

export interface WalletFecadePort {
  findByKey(walletKey: string): Promise<Wallet | null>;
}
