import type { FastifyInstance } from "fastify";
import { transferRoutes } from "./interface/routes/routes.http";

export async function transferModule(app: FastifyInstance) {
	await transferRoutes(app);
}
