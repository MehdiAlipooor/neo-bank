import type { FastifyInstance } from "fastify";
import { getRabbitConnection } from "../../shared/lib/rabbitMq-connector";
import "./infrastructure/message-brokers/main-wallet-deposit-event-consumer";
import { MainWalletEventConsumer } from "./infrastructure/message-brokers/main-wallet-deposit-event-consumer";
import { transferRoutes } from "./interface/routes/routes.http";

export async function transferModule(app: FastifyInstance) {
	await transferRoutes(app);
}

async function bootstrap() {
	const connection = await getRabbitConnection();

	const consumers = [new MainWalletEventConsumer(connection)];
	await Promise.all(consumers.map((c) => c.start()));
}

bootstrap().catch((err) => {
	console.error("❌ Bootstrap failed:", err);
	process.exit(1);
});
