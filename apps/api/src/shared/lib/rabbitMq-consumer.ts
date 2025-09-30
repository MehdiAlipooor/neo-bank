import type { ChannelModel } from "amqplib";

type Handler = (routingKey: string, payload: any) => Promise<void>;

export abstract class RabbitMQEventConsumer {
	private handlers: { pattern: RegExp; handler: Handler }[] = [];

	constructor(
		private connection: ChannelModel,
		private exchange: string,
		private queue: string,
	) {}

	protected on(pattern: RegExp, handler: Handler) {
		this.handlers.push({ pattern, handler });
	}

	async start() {
		const channel = await this.connection.createChannel();
		await channel.assertExchange(this.exchange, "topic", { durable: true });
		await channel.assertQueue(this.queue, { durable: true });
		await channel.bindQueue(this.queue, this.exchange, "wallet.#");
		channel.prefetch(100);

		await channel.consume(this.queue, async (msg) => {
			if (!msg) return;

			try {
				const routingKey = msg.fields.routingKey;
				const payload = JSON.parse(msg.content.toString());

				const match = this.handlers.find((h) => h.pattern.test(routingKey));
				if (match) {
					await match.handler(routingKey, payload);
				}

				channel.ack(msg);
			} catch (err) {
				console.error("❌ Error handling message:", err);
				channel.nack(msg, false, false);
			}
		});

		console.log(
			`✅ Consumer started: queue="${this.queue}" exchange="${this.exchange}"`,
		);
	}
}
