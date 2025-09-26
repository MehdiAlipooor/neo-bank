import { randomUUID } from "node:crypto";
import { LedgerFactory } from "../../../ledger/application/services/ledger-factory.service";
import type { BaseWalletService } from "../../../wallet/application/services/base-wallet.service";
import type { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { Transfer } from "../../domain/entites/transfer.entity";
import type { TransferRepositoryPort } from "../ports/transfer-repository.port";

export class MainWalletTransferService {
  constructor(
    private transferRepo: TransferRepositoryPort,
    private walletService: BaseWalletService<MainWallet>,
    private idempotencyKey: string
  ) {}

  async deposit(wallet: Wallet, amount: number) {
    const exists = await this.transferRepo.existsByIdempotencyKey(
      this.idempotencyKey
    );
    if (exists) {
      throw new Error("IdempotencyKey is already exists");
    }

    const tx = await LedgerFactory.createLedgerTransaction("DEPOSIT");
    await this.walletService.deposit(amount, { ledgerTxKey: tx.ledgerTxKey });

    return await this.transferRepo.create(
      new Transfer(randomUUID(), wallet.walletKey, "DEPOSIT", amount, "CREATED")
    );
  }

  async withdraw(wallet: Wallet, amount: number): Promise<Transfer> {
    const tx = LedgerFactory.createLedgerTransaction("WITHDRAW");
    await this.walletService.withdraw(amount, { ledgerTxKey: tx.ledgerTxKey });

    return this.transferRepo.create(
      new Transfer(
        crypto.randomUUID(),
        wallet.walletKey,
        "WITHDRAW",
        amount,
        "CREATED"
      )
    );
  }

  async internalTransfer(
    source: Wallet,
    dest: Wallet,
    amount: number
  ): Promise<Transfer> {
    const tx = LedgerFactory.createLedgerTransaction("INTERNAL");
    await this.walletService.transfer(dest as any, amount, {
      ledgerTxKey: tx.ledgerTxKey,
    });

    return this.transferRepo.create(
      new Transfer(
        crypto.randomUUID(),
        source.walletKey,
        "INTERNAL",
        amount,
        "CREATED",
        dest.walletKey
      )
    );
  }
}
