import { FastifyInstance } from "fastify";
import { WalletController } from "../controllers/wallet.controller";

export async function registerWalletRoutes(app: FastifyInstance) {
	const controller = new WalletController();

	app.post("/wallet", controller.createWallet.bind(controller));
}
