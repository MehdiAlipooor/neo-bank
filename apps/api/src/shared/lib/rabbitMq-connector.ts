import { type Channel, type ChannelModel, connect } from "amqplib";

let connection: ChannelModel | null;
let channel: Channel | null = null;
export async function getRabbitConnection(): Promise<ChannelModel> {
	if (!connection) {
		connection = await connect(process.env.RABBIT_URL ?? "amqp://localhost", {
			heartbeat: 10,
		});

		connection.on("error", (err) => {
			console.error("❌ RabbitMQ connection error", err);
			connection = null;
		});

		connection.on("close", () => {
			console.warn("⚠️ RabbitMQ connection closed. Reconnecting...");
			connection = null;
			setTimeout(getRabbitConnection, 5000);
		});
	}
	return connection;
}

export async function getRabbitChannel(): Promise<Channel> {
	if (!channel) {
		const conn = await getRabbitConnection();
		channel = await conn.createChannel();
		await channel.assertExchange("wallet.events", "topic", { durable: true });
	}
	return channel;
}

export async function createChannel(): Promise<Channel> {
	return await getRabbitChannel();
}
