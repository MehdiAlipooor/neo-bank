import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthRepository } from "../../infrastructure/repositories/auth-repository";
import { RefreshTokenRepository } from "../../infrastructure/repositories/refresh-token.repo";
import { LoginUserUseCase } from "../../application/use-cases/login-user.use-case";
import { IssueTokensUseCase } from "../../application/use-cases/issue-token.use-case";
import { TokenService } from "../../domain/services/RefreshToken.service";

const repo = new AuthRepository();

const privateKeyBase64 = process.env.PASETO_PRIVATE_KEY;
if (!privateKeyBase64) throw new Error("PASETO_PRIVATE_KEY is not set");

const privateKey = Uint8Array.from(Buffer.from(privateKeyBase64, "base64"));

const tokenService = new TokenService(privateKey);
const refreshTokenRepo = new RefreshTokenRepository();

const issueTokensUseCase = new IssueTokensUseCase(
	tokenService,
	refreshTokenRepo,
);
const loginUser = new LoginUserUseCase(repo, issueTokensUseCase);

export async function loginUserController(
	req: FastifyRequest<{ Body: any }>,
	reply: FastifyReply,
) {
	try {
		const user = await loginUser.execute(req.body);
		reply.code(201).send(user);
	} catch (err) {
		reply.code(400).send({ error: (err as Error).message });
	}
}
