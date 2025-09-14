    
export abstract class LedgerEntry {
    id: string;
    ledgerEntryKey: string;
    walletKey?: string;
    account: string;
    amount: bigint;
    type: string;
    metadata?: any;
    createdAt: Date;
  
    constructor(
      id: string,
      ledgerEntryKey: string,
      account: string,
      amount: bigint,
      type: string,
      walletKey?: string,
      metadata?: any
    ) {
      this.id = id;
      this.ledgerEntryKey = ledgerEntryKey;
      this.account = account;
      this.amount = amount;
      this.type = type;
      this.walletKey = walletKey;
      this.metadata = metadata;
      this.createdAt = new Date();
    }
  }
  