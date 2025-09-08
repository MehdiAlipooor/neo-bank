import type { FastifyInstance } from "fastify";
import { registerWalletRoutes } from "./http/wallet-router.http";

export async function walletRoutes(app: FastifyInstance) {
	await registerWalletRoutes(app);
}
