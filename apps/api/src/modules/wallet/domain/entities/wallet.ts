import { WalletPolicy } from "../policies/wallet.policy";

export abstract class  Wallet {
    constructor(
        public walletKey: string,
        public accountId: string,
        public walletType: string,
        public balance: number,
        public available: number,
        public policy: WalletPolicy
    ) {}
    
    abstract deposit(amount: number, meta?: any): Promise<void>;
    abstract withdraw(amount: number, meta?: any): Promise<void>;
    abstract transfer(to: Wallet, amount: number, meta?: any): Promise<void>;
  
    getAvailableBalance(): number {
      return this.available;
    }
  
}