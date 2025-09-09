// import amqp, { Channel, ChannelModel, Connection, Options } from "amqplib";

// let connection: ChannelModel | null = null;
// let channel: Channel | null = null;

// export async function getRabbitChannel(): Promise<Channel> {
// 	if (channel) return channel;
// 	const url = process.env.RABBITMQ_URL || "amqp://localhost";
// 	connection = await amqp.connect(url);
// 	channel = await connection.createChannel();

// 	const mainQueue = process.env.RABBITMQ_DEPOSIT_QUEUE || "deposit_verify";
// 	const dlq = process.env.RABBITMQ_DEPOSIT_DLQ || "deposit.verify.dlq";
// 	const exchange = "deposit.verify.exchange";
// 	const dlx = "deposit.verify.dlx";

// 	await channel!.assertExchange(exchange, "direct", { durable: true });
// 	await channel!.assertExchange(dlx, "fanout", { durable: true });

// 	await channel!.assertQueue(dlq, { durable: true });
// 	await channel!.bindQueue(dlq, dlx, "");

// 	const args: Options.AssertQueue = {
// 		durable: true,
// 		deadLetterExchange: dlx,
// 		// optional TTL — در صورت نیاز تنظیم کن
// 		// messageTtl: 5 * 60 * 1000,
// 	};

// 	await channel!.assertQueue(mainQueue, args);
// 	await channel!.bindQueue(mainQueue, exchange, "route");

// 	return channel!;
// }

import amqp, { Channel, ChannelModel, Connection, Options } from "amqplib";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

// ثابت کردن نام exchange و queue
export const DEPOSIT_EXCHANGE = "deposit.verify.exchange";
export const DEPOSIT_QUEUE = "deposit.verify";
export const DEPOSIT_DLX = "deposit.verify.dlx";
export const DEPOSIT_DLQ =
	process.env.RABBITMQ_DEPOSIT_DLQ || "deposit.verify.dlq";

export async function getRabbitChannel(): Promise<Channel> {
	if (channel) return channel;

	const url = process.env.RABBITMQ_URL || "amqp://127.0.0.1";
	connection = await amqp.connect(url);
	channel = await connection.createChannel();

	// ایجاد exchange و DLX
	await channel.assertExchange(DEPOSIT_EXCHANGE, "direct", { durable: true });
	await channel.assertExchange(DEPOSIT_DLX, "fanout", { durable: true });

	// DLQ
	await channel.assertQueue(DEPOSIT_DLQ, { durable: true });
	await channel.bindQueue(DEPOSIT_DLQ, DEPOSIT_DLX, "");

	// Main queue با dead-letter
	const queueArgs: Options.AssertQueue = {
		durable: true,
		deadLetterExchange: DEPOSIT_DLX,
	};

	await channel.assertQueue(DEPOSIT_QUEUE, queueArgs);
	await channel.bindQueue(DEPOSIT_QUEUE, DEPOSIT_EXCHANGE, "route");

	return channel;
}