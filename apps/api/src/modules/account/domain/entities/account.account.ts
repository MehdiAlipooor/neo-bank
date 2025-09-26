export class Account {
	constructor(
		private readonly id: string,
		private readonly accountKey: string,
		private readonly userId: string,

		public type: "PERSONAL" = "PERSONAL",
		public status: "ACTIVE" | "INACTIVE" = "ACTIVE",
		public createdAt: Date = new Date(),
	) {}

	getAccountKey() {
		return this.accountKey;
	}

	getId() {
		return this.id;
	}

	getUserId() {
		return this.userId;
	}
}
