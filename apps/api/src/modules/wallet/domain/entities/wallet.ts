import { WalletPolicy } from "../policies/wallet.policy";
import { Money } from "../value-objects/money.value-object";

export abstract class Wallet {
	constructor(
		public walletKey: string,
		public accountId: string,
		public walletType: "MAIN" | "CHEQUE" | "SAVING-POT",
		public balance: Money,
		public available: Money,
		public policy?: WalletPolicy,
	) {}

	abstract deposit(amount: number, meta?: any): Promise<void>;
	abstract withdraw(amount: number, meta?: any): Promise<void>;
	abstract transfer(to: Wallet, amount: number, meta?: any): Promise<void>;

	getAvailableBalance(): number {
		return this.available.value;
	}

	/** Domain events can be raised here if needed */
	protected addDomainEvent(event: any) {
		// push to internal event list for publishing
	}
}
