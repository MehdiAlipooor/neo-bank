import { Wallet } from "../../domain/entities/Wallet";

export class BaseWalletService<T extends Wallet>{
    private walletType: string

    constructor(private wallet: T){
        this.walletType = wallet.walletType
    }


    async deposit(amount: number, meta?: any){
        if(!this.wallet.policy.canDeposit(this.walletType)){
            throw new Error("Deposit is not allowed for this wallet type")
        }
        

        this.wallet.balance +=amount
        this.wallet.available +=amount
    }

    async withdraw(amount: number, meta?: any) {
        if (!this.wallet.policy.canWithdraw(this.walletType)) {
          throw new Error("Withdraw not allowed");
        }
        if (this.wallet.getAvailableBalance() < amount) {
          throw new Error("Insufficient funds");
        }
        this.wallet.balance -= amount;
        this.wallet.available -= amount;
        // publish event or ledger entry
      }
    
      async transfer(to: T, amount: number, meta?: any) {
        if (!this.wallet.policy.canTransfer(to.walletType)) {
          throw new Error("Transfer not allowed to target wallet type");
        }
        await this.withdraw(amount, meta);
        await to.deposit(amount, meta);
      }
    
}