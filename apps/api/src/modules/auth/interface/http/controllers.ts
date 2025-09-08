import type { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.use-case";
import { AuthRepository } from "../../infrastructure/repositories/auth-repository";

const repo = new AuthRepository();
const registerUser = new RegisterUserUseCase(repo);

export async function registerUserHandler(
	req: FastifyRequest<{ Body: { username: string; phone: string } }>,
	reply: FastifyReply,
) {
	try {
		const user = await registerUser.execute(req.body);
		reply.code(201).send({ id: user.phone, email: user.id });
	} catch (err) {
		reply.code(400).send({ error: (err as Error).message });
	}
}
