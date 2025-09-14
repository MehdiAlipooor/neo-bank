export interface WalletPolicy {
	canDeposit(fromType: string): boolean;
	canWithdraw(toType: string): boolean;
	canTransfer(toType: string): boolean;
	validate?(
		operation: "deposit" | "withdraw" | "transfer",
		amount: number,
	): void;
}
