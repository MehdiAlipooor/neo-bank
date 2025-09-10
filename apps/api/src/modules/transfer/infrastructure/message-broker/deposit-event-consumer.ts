import {
	DEPOSIT_QUEUE,
	getRabbitChannel,
} from "../../../../../lib/queue/rabbitMq";

export class DepositEventConsumer {
	constructor(private queue = DEPOSIT_QUEUE) {}

	async consume(
		onMessage: (
			msg: { transferId: string },
			ack: () => void,
			retry: () => void,
		) => Promise<void>,
	) {
		const ch = await getRabbitChannel();
		await ch.prefetch(10);

		await ch.consume(
			this.queue,
			async (message) => {
				if (!message) return;
				const ack = () => ch.ack(message);
				const retry = () => ch.nack(message, false, true);

				try {
					const content = JSON.parse(message.content.toString()) as {
						transferId: string;
					};
					await onMessage(content, ack, retry);
				} catch (err) {
					console.error("Consumer parse error", err);
					ch.nack(message, false, false); // میره به DLQ
				}
			},
			{ noAck: false },
		);
	}
}
