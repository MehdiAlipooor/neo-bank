import prisma from "../../../../../lib/db/prisma";
import type { RefreshToken } from "../../domain/entities/RefreshToken";

export class RefreshTokenRepository {
	async save(token: RefreshToken): Promise<void> {
		await prisma.refreshToken.create({
			data: {
				id: token.id,
				userId: token.userId,
				token: token.token,
				expiresAt: token.expiresAt,
				revoked: token.revoked,
				createdAt: token.createdAt,
				updatedAt: token.updatedAt,
			},
		});
	}
}
