import type { FastifyInstance } from "fastify";
import { findUserController } from "./find-users.controller";
import { loginUserController } from "./login-user.controller";

export async function authRoutes(app: FastifyInstance) {
	app
		// .post('/auth/register', registerUserHandler)
		.get("/user/example@gmail.com", findUserController)
		.post("/auth/login", loginUserController);
}
