import type { TokenService } from "../../domain/services/RefreshToken.service";
import type { RefreshTokenRepository } from "../../infrastructure/repositories/refresh-token.repo";

export class IssueTokensUseCase {
	constructor(
		private readonly tokenService: TokenService,
		private readonly refreshTokenRepo: RefreshTokenRepository,
	) {}

	async execute(userId: string) {
		const { accessToken, refreshToken } =
			await this.tokenService.generateTokens(userId);
		await this.refreshTokenRepo.save(refreshToken);
		return { accessToken, refreshToken: refreshToken.token };
	}
}
