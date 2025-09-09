import type { FastifyInstance } from "fastify";
import { loginUserController } from "./login-user.controller";

export async function authRoutes(app: FastifyInstance) {
	app
		.post("/auth/login", loginUserController);
}
