import { FastifyInstance } from "fastify";
import { TransferController } from "./transfer-controller.http";

export async function transferRoutes(app: FastifyInstance) {
	app.post("/transfer/deposit", TransferController.initDeposit),
		app.put("/transfer/deposit", TransferController.confirmDeposit),
		app.post("/transfer/internal", TransferController.internalTransfer);
}
