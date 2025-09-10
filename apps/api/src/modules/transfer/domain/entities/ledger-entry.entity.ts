// import { Money } from "../../../wallet/domain/value-objects/Money";

import { Money } from "../../../wallet/domain/value-objects/Money";

// export class LedgerEntry {
// 	constructor(
// 		public id: string,
// 		public walletId: string | null,
// 		public amount: Money,
// 		public account: LedgerEntryAccoun,
// 		public type: LedgerTransactionType,
// 		public reference?: string,
// 		public createdAt: Date = new Date(),
// 	) {}
// }

// export enum LedgerTransactionType {
// 	TRANSFER = "TRANSFER",
// 	WITHDRAW_PENDING = "WITHDRAW_PENDING",
// 	WITHDRAW_SETTLED = "WITHDRAW_SETTLED",
//   }

//   export enum LedgerEntryAccoun {
// 	WALLET = "WALLET",
// 	SETTLEMENT = "SETTLEMENT",
// 	FEE = "FEE",
// 	SYSTEM = "SYSTEM",
//   }

export enum LedgerTransactionType {
	TRANSFER = "TRANSFER",
	DEPOSIT = "DEPOSIT",
	WITHDRAW_PENDING = "WITHDRAW_PENDING",
	WITHDRAW_SETTLED = "WITHDRAW_SETTLED",
	WITHDRAW_FAILED = "WITHDRAW_FAILED",
}

export enum LedgerEntryAccoun {
	EXTERNAL = "EXTERNAL",
	WALLET = "WALLET",
	SETTLEMENT = "SETTLEMENT",
	FEE = "FEE",
	SYSTEM = "SYSTEM",
}

export class LedgerTransaction {
	constructor(
		public readonly id: string,
		public readonly transferId: string,
		public type: LedgerTransactionType,
		public entries: LedgerEntry[] = [],
		public readonly createdAt: Date = new Date(),
	) {}

	addEntry(entry: LedgerEntry) {
		this.entries.push(entry);
	}
}

export class LedgerEntry {
	constructor(
		public readonly id: string,
		public readonly txId: string,
		public readonly walletId: string,
		public readonly account: LedgerEntryAccoun,
		public readonly amount: Money,
		public readonly metadata?: Record<string, any>,
		public readonly createdAt: Date = new Date(),
	) {}
}
