import type { WalletPolicy } from "./wallet.policy";

export class SavingPotPolicy implements WalletPolicy {
	canDeposit(fromType: string): boolean {
		return fromType === "MAIN";
	}
	canWithdraw(toType: string): boolean {
		return toType === "MAIN";
	}
	canTransfer(_toType: string): boolean {
		return false;
	}
	validate?(
		_operation: "deposit" | "withdraw" | "transfer",
		amount: number,
	): void {
		if (amount <= 0) {
			throw new Error("Amount must be positive");
		}
	}
}
