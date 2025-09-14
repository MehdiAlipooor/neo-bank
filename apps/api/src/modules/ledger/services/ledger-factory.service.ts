import { ConcreteLedgerTransaction } from "../domain/entities/concrete-ledger-transaction.entity";

export class LedgerFactory {
    static createLedgerTransaction(type: string) {
      return new ConcreteLedgerTransaction(
        crypto.randomUUID(),
        `ledgerTx-${Date.now()}`,
        type
      );
    }
  }
  