import type { WalletPolicy } from "./wallet.policy";

export class MainWalletPolicy implements WalletPolicy {
	/**
	 *
	 * @description Main wallet can deposit from anywhere
	 * @returns
	 */
	canDeposit(_fromType: string): boolean {
		return true;
	}

	/**
	 *
	 * @param description Main wallet can withdraw from anywhere
	 */
	canWithdraw(_toType: string): boolean {
		return true;
	}

	/**
	 *
	 * @param description Main wallet can transfer from and to anywhere
	 */
	canTransfer(_toType: string): boolean {
		return true;
	}

	validate?(
		_operation: "deposit" | "withdraw" | "transfer",
		amount: number,
	): void {
		if (amount <= 0) throw new Error("Amount must be positive");
	}
}
