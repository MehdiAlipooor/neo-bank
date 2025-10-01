import type { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import { WalletTransferService } from "./wallet-transfer.service";

export class MainWalletTransferService extends WalletTransferService<MainWallet> {
  async deposit(
    wallet: MainWallet,
    idempotencyKey: string,
    amount: number,
    tx: any
  ) {
    return super.deposit(wallet, idempotencyKey, amount, tx);
  }
}
