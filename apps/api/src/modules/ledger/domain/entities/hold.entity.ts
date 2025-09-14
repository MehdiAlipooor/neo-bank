export abstract class Hold {
    id: string;
    holdKey: string;
    walletKey: string;
    amount: bigint;
    status: "ACTIVE" | "CONSUMED" | "RELEASED" | "EXPIRED";
    transferKey?: string;
    createdAt: Date;
    expiresAt?: Date;
  
    constructor(id: string, holdKey: string, walletKey: string, amount: bigint) {
      this.id = id;
      this.holdKey = holdKey;
      this.walletKey = walletKey;
      this.amount = amount;
      this.status = "ACTIVE";
      this.createdAt = new Date();
    }
  
    abstract release(): void;
    abstract consume(): void;
  }
  