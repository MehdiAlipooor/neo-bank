import amqplib, { Channel, ChannelModel } from "amqplib";

let connection: ChannelModel;
let channel: Channel;

export async function getRabbitChannel() {
  if (!channel) {
    connection = await amqplib.connect(process.env.RABBIT_URL ?? "amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertExchange("wallet.events", "topic", { durable: true });
  }
  return channel;
}


export class RabbitMQPublisher {
    private exchange = "wallet.events";

    async publish<T>(routingKey: string, message: T) {
      const channel = await getRabbitChannel();
      channel.publish(
        this.exchange,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
      console.log(`[Publisher] Sent ${routingKey}`, message);
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
