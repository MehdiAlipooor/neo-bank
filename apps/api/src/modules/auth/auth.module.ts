import type { FastifyInstance } from "fastify";
import { authRoutes } from "./interface/http/routes";

export async function authModule(app: FastifyInstance) {
	await authRoutes(app);
}
