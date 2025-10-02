export class Money {
	private readonly amount: number;

	constructor(amount: number) {
		// if (Number.isFinite(amount) || amount < 0) {
		// 	throw new Error("Money amount cannot be negative");
		// }

		this.amount = amount || 0;
	}

	add(other: Money): Money {
		return new Money(this.amount + other.amount);
	}

	subtract(other: Money): Money {
		if (other.amount > this.amount) {
			throw new Error("Insufficient funds");
		}

		return new Money(this.amount - other.amount);
	}

	get value(): number {
		return this.amount;
	}

	gte(other: Money) {
		return this.amount >= other.amount;
	}
}
