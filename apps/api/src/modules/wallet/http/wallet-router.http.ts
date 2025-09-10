import type { FastifyInstance } from "fastify";
import { WalletController } from "./wallet-controller.https";

export async function registerWalletRoutes(app: FastifyInstance) {
	const controller = new WalletController();

	app.post("/wallet", controller.createWallet.bind(controller));
}
