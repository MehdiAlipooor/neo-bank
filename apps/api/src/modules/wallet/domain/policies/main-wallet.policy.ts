import { WalletPolicy } from "./wallet.policy";

export class MainWalletPolicy implements WalletPolicy{
    /**
     * 
     * @description Main wallet can deposit from anywhere
     * @returns 
     */
    canDeposit(fromType: string): boolean {
        return true
    }

    /**
     * 
     * @param description Main wallet can withdraw from anywhere
     */
    canWithdraw(toType: string): boolean {
        return true
    }

    /**
     * 
     * @param description Main wallet can transfer from and to anywhere
     */    
    canTransfer(toType: string): boolean {
        return true
    }

    validate?(operation:  "deposit" | "withdraw" | "transfer", amount: number): void {
        if (amount <= 0) throw new Error("Amount must be positive");
    }
}