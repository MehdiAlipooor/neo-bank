import { Money } from "../value-objects/Money";
import { Hold } from "../../../transfer/domain/entities/hold.entity";
import { HoldStatus } from "../../../transfer/domain/value-objects/hold-status.vo";
import { randomUUID } from "node:crypto";

export class Wallet {
	public balance: Money;
	public holds: Hold[];

	constructor(
		public readonly id: string,
		public readonly userId: string,
		balance: number,
		public available: Money,

		holds?: Hold[],

		public cardNumber?: string,
		public accountNumber?: string,
		public shabaNumber?: string,
		public isRemoved: boolean = false,
		public createdAt: Date = new Date(),
		public updatedAt: Date = new Date(),
	) {
		this.balance = new Money(balance);
		this.available = new Money(balance);
		this.holds = holds ?? [];
	}

	canPlacehold(amount: Money): boolean {
		return this.available.gte(amount);
	}

	getAvailableBalance(): Money {
		if (!this.holds.length) {
			return this.balance;
		}

		const currentHolds = this.holds.reduce(
			(acc, item) => acc + Number(item.amount),
			0,
		);

		return new Money(this.balance.value - currentHolds);
	}

	applyHold(amount: Money) {
		if (!this.canPlacehold(amount)) {
			throw new Error("insufficient_available_balance");
		}

		this.available = this.available.subtract(amount);
	}

	createHold(amount: Money, transferId: string) {
		if (amount.value > this.getAvailableBalance().value)
			throw new Error("insufficient_available_balance_for_hold");

		const hold = new Hold(
			randomUUID(),
			this.id,
			new Money(amount.value),
			HoldStatus.ACTIVE,
		);

		this.holds.push(hold);

		this.applyHold(amount)
		return hold;
	}

	releaseHold(holdId: string) {
		const hold = this.holds?.find((h) => h.id === holdId);
		if (hold) hold.status = HoldStatus.RELEASED;
	}

	deposit(amount: Money): void {
		if (amount.value <= 0) {
			throw new Error("insuficient_amount");
		}

		this.balance = this.balance.add(amount);
	}

	withdraw(amount: Money): void {
		if (amount.value <= 0) throw new Error("Withdraw must be positive");

		this.balance = this.balance.subtract(amount);
	}

	getBalance(): number {
		return this.balance.value;
	}
}