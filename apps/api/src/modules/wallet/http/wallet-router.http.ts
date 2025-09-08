import type { FastifyInstance } from "fastify";
import { WalletController } from "./wallet-controller.https";

export async function registerWalletRoutes(app: FastifyInstance) {
	const controller = new WalletController();

	app.post("/wallet", controller.createWallet.bind(controller));
	// app.post("/wallet/deposit", controller.depositFunds.bind(controller));
	// app.post("/wallet/withdraw", controller.withdrawFunds.bind(controller));
	// app.get("/wallet/:id/balance", controller.getBalance.bind(controller));
}
