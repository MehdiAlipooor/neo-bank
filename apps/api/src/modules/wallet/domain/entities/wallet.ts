import type { WalletType } from "../factories/create-wallet.factory";
import type { WalletPolicy } from "../policies/wallet.policy";
import type { Money } from "../value-objects/money.value-object";

export abstract class Wallet {
	constructor(
		public walletKey: string,
		public accountId: string,
		public walletType: WalletType,
		public balance: Money,
		public available: Money,
		public policy?: WalletPolicy,
	) {}

	protected setPolicy(policy: WalletPolicy) {
		this.policy = policy;
	}

	abstract deposit(amount: number, meta?: any): Promise<void>;
	abstract withdraw(amount: number, meta?: any): Promise<void>;
	abstract transfer(to: Wallet, amount: number, meta?: any): Promise<void>;

	getAvailableBalance(): number {
		return this.available.value;
	}

	/** Domain events can be raised here if needed */
	protected addDomainEvent(_event: any) {
		// push to internal event list for publishing
	}
}
