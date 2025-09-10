import type { FastifyInstance } from "fastify";
import { transferRoutes } from "./http/routes.http";
import "./infrastructure/workers/deposit.worker";
import "./infrastructure/workers/withdraw.worker";

export async function transferModule(app: FastifyInstance) {
	await transferRoutes(app);
}
