import { type Prisma, TransferStatus } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import type { LedgerFecadePort } from "../../../ledger/application/ports/ledger-fecade.port";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import type { Transfer } from "../../domain/entites/transfer.entity";
import type { TransferRepositoryPort } from "../ports/transfer-repository.port";

export class MainWalletDepositSettlementWorkflow {
  constructor(
    private readonly transferRepo: TransferRepositoryPort,
    private readonly ledgerFecade: LedgerFecadePort
  ) {}

  async execute({
    _wallet,
    transfer,
    _amount,
  }: {
    _amount: number;
    _wallet: Wallet;
    transfer: Transfer;
  }) {
    await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
      await this.ledgerFecade.updateTransactionStatus(
        transfer.transferKey,
        "SETTLED",
        transaction
      );
      await this.transferRepo.updateStatus(
        transfer.id,
        TransferStatus.SETTLED,
        transaction
      );
    });
  }
}
