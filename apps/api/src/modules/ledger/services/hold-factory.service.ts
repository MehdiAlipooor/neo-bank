import { ConcreteHold } from "../domain/entities/concrete-hold.entity";

export class HoldFactory {
    static createHold(walletKey: string, amount: bigint) {
      return new ConcreteHold(
        crypto.randomUUID(),
        `hold-${Date.now()}`,
        walletKey,
        amount
      );
    }
  }
  