import type { FastifyInstance } from "fastify";
import { MainWalletController } from "../controllers/main-wallet.controller";

const mainWalletController = new MainWalletController();

export async function transferRoutes(app: FastifyInstance) {
	app.post("/transfer/main/deposit", mainWalletController.deposit);
}
