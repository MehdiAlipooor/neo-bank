/**
 * @description This file is very clean to use
 */

// import amqp, { type Channel, type ChannelModel, type Options } from "amqplib";

// let connection: ChannelModel | null = null;
// let channel: Channel | null = null;

// // Exchange & queue names
// export const WITHDRAW_EXCHANGE = "withdraw.verify.exchange";
// export const WITHDRAW_QUEUE = "withdraw.verify";

// export const DEPOSIT_EXCHANGE = "deposit.verify.exchange";
// export const DEPOSIT_QUEUE = "deposit.verify";

// export const DEPOSIT_DLX = "deposit.verify.dlx";
// export const WITHDRAW_DLX = "withdraw.verify.dlx";

// export const DEPOSIT_DLQ =
//   process.env.RABBITMQ_DEPOSIT_DLQ || "deposit.verify.dlq";
// export const WITHDRAW_DLQ =
//   process.env.RABBITMQ_WITHDRAW_DLQ || "withdraw.verify.dlq";

// export async function getRabbitConnection(): Promise<ChannelModel> {
//   if (!connection) {
//     const url = process.env.RABBITMQ_URL || "amqp://127.0.0.1";
//     connection = await amqp.connect(url, { heartbeat: 10 });

//     connection.on("error", (err) => {
//       console.error("❌ RabbitMQ connection error:", err);
//       connection = null;
//     });

//     connection.on("close", () => {
//       console.warn("⚠️ RabbitMQ connection closed. Reconnecting...");
//       connection = null;
//       setTimeout(getRabbitConnection, 5000);
//     });
//   }
//   return connection;
// }

// export async function getRabbitChannel(): Promise<Channel> {
//   if (!channel) {
//     const conn = await getRabbitConnection();
//     channel = await conn.createChannel();

//     // Exchanges
//     await channel.assertExchange(DEPOSIT_EXCHANGE, "direct", { durable: true });
//     await channel.assertExchange(DEPOSIT_DLX, "fanout", { durable: true });

//     await channel.assertExchange(WITHDRAW_EXCHANGE, "direct", {
//       durable: true,
//     });
//     await channel.assertExchange(WITHDRAW_DLX, "fanout", { durable: true });

//     // DLQs
//     await channel.assertQueue(DEPOSIT_DLQ, { durable: true });
//     await channel.bindQueue(DEPOSIT_DLQ, DEPOSIT_DLX, "");

//     await channel.assertQueue(WITHDRAW_DLQ, { durable: true });
//     await channel.bindQueue(WITHDRAW_DLQ, WITHDRAW_DLX, "");

//     // Main queues with DLX
//     const depositQueueArgs: Options.AssertQueue = {
//       durable: true,
//       deadLetterExchange: DEPOSIT_DLX,
//     };
//     await channel.assertQueue(DEPOSIT_QUEUE, depositQueueArgs);
//     await channel.bindQueue(DEPOSIT_QUEUE, DEPOSIT_EXCHANGE, "route");

//     const withdrawQueueArgs: Options.AssertQueue = {
//       durable: true,
//       deadLetterExchange: WITHDRAW_DLX,
//     };
//     await channel.assertQueue(WITHDRAW_QUEUE, withdrawQueueArgs);
//     await channel.bindQueue(WITHDRAW_QUEUE, WITHDRAW_EXCHANGE, "route");
//   }
//   return channel;
// }
