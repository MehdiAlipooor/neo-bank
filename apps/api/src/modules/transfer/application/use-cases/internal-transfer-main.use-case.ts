import type { Wallet } from "../../../wallet/domain/entities/wallet";
import type { MainWalletTransferService } from "../services/main-wallet-transfer.service";

export class InternalTransferMainUseCase {
  constructor(private service: MainWalletTransferService) {}

  async execute(
    source: Wallet,
    idempotencyKey: string,
    dest: Wallet,
    amount: number
  ) {
    // return this.service.internalTransfer(source, idempotencyKey, dest, amount);
  }
}
