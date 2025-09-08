import type { Money } from "../value-objects/Money";

export class LedgerEntry {
	constructor(
		public id: string,
		public walletId: string | null,
		public amount: Money,
		public account: string,
		public reference?: string,
		public createdAt: Date = new Date(),
	) {}
}
