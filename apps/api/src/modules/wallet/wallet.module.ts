import { FastifyInstance } from "fastify";
import { registerWalletRoutes } from "./http/routers/wallet.router";

export async function walletModule(app: FastifyInstance) {
	await registerWalletRoutes(app);
}
