import type { Prisma } from "@prisma/client";
import type { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import type { MainWalletTransferService } from "../services/main-wallet-transfer.service";

export class DepositMainUseCase {
  constructor(private service: MainWalletTransferService) {}

  async execute(
    wallet: MainWallet,
    idempotencyKey: string,
    amount: number,
    tx: Prisma.TransactionClient
  ) {
    return await this.service.deposit(wallet, idempotencyKey, amount, tx);
  }
}
