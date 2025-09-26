import type { Wallet } from "../../domain/entities/wallet";
import { Money } from "../../domain/value-objects/money.value-object";

export class BaseWalletService<T extends Wallet> {
	private walletType: string;

	constructor(private wallet: T) {
		this.walletType = wallet.walletType;
	}

	async deposit(amount: number, _meta?: any) {
		if (
			!this.wallet.policy?.canDeposit?.(this.walletType) &&
			this.walletType !== "MAIN"
		) {
			throw new Error("Deposit is not allowed for this wallet type");
		}

		this.wallet.balance = this.wallet.balance.add(new Money(amount));
		this.wallet.available = this.wallet.available.add(new Money(amount));
	}

	async withdraw(amount: number, _meta?: any) {
		if (!this.wallet.policy?.canWithdraw?.(this.walletType)) {
			throw new Error("Withdraw not allowed");
		}
		if (this.wallet.getAvailableBalance() < amount) {
			throw new Error("Insufficient funds");
		}
		this.wallet.balance = this.wallet.balance.subtract(new Money(amount));
		this.wallet.available = this.wallet.available.subtract(new Money(amount));
		// publish event or ledger entry
	}

	async transfer(to: T, amount: number, meta?: any) {
		if (!this.wallet.policy?.canTransfer?.(to.walletType)) {
			throw new Error("Transfer not allowed to target wallet type");
		}
		await this.withdraw(amount, meta);
		await to.deposit(amount, meta);
	}
}
