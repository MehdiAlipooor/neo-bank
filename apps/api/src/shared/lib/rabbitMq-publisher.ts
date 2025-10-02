import { createChannel } from "./rabbitMq-connector";

export class RabbitMQPublisher {
	private exchange = "wallet.events";
	private channelPromise: Promise<any>;

	constructor() {
		this.channelPromise = this.init();
	}

	private async init() {
		const channel = await createChannel();
		await channel.assertExchange(this.exchange, "topic", { durable: true });
		return channel;
	}

	async publish<T>(routingKey: string, message: T) {
		const channel = await this.channelPromise;
		channel.publish(
			this.exchange,
			routingKey,
			Buffer.from(JSON.stringify(message)),
			{ persistent: true },
		);
		// console.log(`[Publisher] Sent ${routingKey}`, message);
	}

	// private connection!: ChannelModel;
	// private channel!: Channel;
	// private exchange = "wallet.events";

	// private routingKey: string;
	// private message: any;

	// constructor(routingKey: string, message: string) {
	// 	this.routingKey = routingKey;
	// 	this.message = message;
	// }

	// async init() {
	// 	if (!this.connection) {
	// 		this.connection = await amqplib.connect(
	// 			process.env.RABBIT_URL || "amqp://localhost",
	// 		);
	// 		this.channel = await this.connection.createChannel();
	// 		await this.channel.assertExchange(this.exchange, "topic", {
	// 			durable: true,
	// 		});
	// 	}
	// }

	// async publish() {
	// 	if (!this.channel) await this.init();
	// 	const payload = Buffer.from(JSON.stringify(this.message));
	// 	this.channel.publish(this.exchange, this.routingKey, payload, {
	// 		persistent: true,
	// 	});
	// 	console.log(`[Publisher] Sent ${this.routingKey}`, this.message);
	// }
}
