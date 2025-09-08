// domain/entities/RefreshToken.ts

export class RefreshToken {
	constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly token: string,
		public readonly expiresAt: Date,
		public readonly revoked: boolean = false,
		public readonly createdAt: Date = new Date(),
		public readonly updatedAt: Date = new Date(),
	) {}

	static create(userId: string, token: string, ttlInDays = 30): RefreshToken {
		const expiresAt = new Date(Date.now() + ttlInDays * 24 * 60 * 60 * 1000);
		return new RefreshToken(crypto.randomUUID(), userId, token, expiresAt);
	}

	revoke(): RefreshToken {
		return new RefreshToken(
			this.id,
			this.userId,
			this.token,
			this.expiresAt,
			true,
			this.createdAt,
			new Date(),
		);
	}
}
