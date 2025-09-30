import type { Prisma } from "@prisma/client";
import type { LedgerTransaction } from "../../domain/entities/ledger-transaction.entity";
import type { LedgerTransactionStatus } from "../../domain/enums/ledger-transaction-status.enum";
import { LedgerRepository } from "../../infrastructure/repositories/ledger.repository";
import type { LedgerFecadePort } from "../ports/ledger-fecade.port";
import type { LedgerRepositoryPort } from "../ports/ledger-repository.port";

export class LedgerFecad implements LedgerFecadePort {
  private repo: LedgerRepositoryPort;
  constructor() {
    this.repo = new LedgerRepository();
  }

  async saveTransaction(
    ledgerTx: LedgerTransaction,
    tx: Prisma.TransactionClient
  ): Promise<void> {
    return await this.repo.saveTransaction(ledgerTx, tx);
  }
  async updateTransactionStatus(
    transferKey: string,
    status: LedgerTransactionStatus,
    tx: Prisma.TransactionClient
  ): Promise<void> {
    return await this.repo.updateTransactionStatus(transferKey, status, tx);
  }
}
