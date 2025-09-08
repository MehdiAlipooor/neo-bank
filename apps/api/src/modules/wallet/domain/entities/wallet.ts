import { Money } from "../value-objects/Money";

export class Wallet {
	public balance: Money;

	constructor(
		public readonly id: string,
		public readonly userId: string,
		balance: number,
		public available: Money,

		public cardNumber?: string,
		public accountNumber?: string,
		public shabaNumber?: string,
		public isRemoved: boolean = false,
		public createdAt: Date = new Date(),
		public updatedAt: Date = new Date(),
	) {
		this.balance = new Money(balance);
	}

	canPlacehold(amount: Money): boolean {
		return this.available.gte(amount);
	}

	applyHold(amount: Money) {
		if (!this.canPlacehold(amount)) {
			throw new Error("insufficient_available_balance");
		}

		this.available = this.available.subtract(amount);
	}

	releaseHold(amount: Money) {
		this.available = this.available.add(amount);
	}

	deposit(amount: Money): void {
		this.balance = this.balance.add(amount);
	}

	withdraw(amount: Money): void {
		this.balance = this.balance.subtract(amount);
	}

	getBalance(): number {
		return this.balance.value;
	}
}

// import { Decimal } from "@prisma/client/runtime/library";
// import { Money } from "../value-objects/Money";

// export class Wallet {
//     private balance: Money;

//     constructor(
//         public readonly id: string,
//         public readonly userId: string,
//         balance: number = 0,
//         public cardNumber?: string,
//         public accountNumber?: string,
//         public shabaNumber?: string,
//         public isRemoved: boolean = false,
//         public createdAt: Date = new Date(),
//         public updatedAt: Date = new Date()
//     ) {
//         this.balance = new Money(balance);
//     }

//     static create(
//         userId: string,
//         balance: number = 0,
//         cardNumber?: string,
//         accountNumber?: string,
//         shabaNumber?: string
//     ) {
//         return new Wallet(
//             crypto.randomUUID(),
//             userId,
//             balance,
//             cardNumber,
//             accountNumber,
//             shabaNumber,
//             false,
//             new Date(),
//             new Date()
//         );
//     }

//     remove() {
//         this.isRemoved = true;
//     }

//     addBalance(amount: number | Decimal) {
//         this.balance = Number(this.balance) + Number(amount);
//     }

//     subtractBalance(amount: number | Decimal) {
//         if (Number(amount) > Number(this.balance)) {
//             throw new Error("Insufficient balance");
//         }
//         this.balance = Number(this.balance) - Number(amount);
//     }

//     deposit(amount: Money): void {
//         this.balance = this.balance.add(amount);
//     }

//     withdraw(amount: Money): void {
//         this.balance = this.balance.subtract(amount);
//     }

//     getBalance(): number {
//         return this.balance.value;
//     }
// }
