import {
	DEPOSIT_QUEUE,
	getRabbitChannel,
	WITHDRAW_QUEUE,
} from "../../../../../lib/queue/rabbitMq";

type Payload = {
	destAccountId: string;
	sourceWalletId: string;
	amount: number;
	holdId: string;
	idempotencyKey: string;
};

export class WithdrawEventConsumer {
	constructor(private queue = WITHDRAW_QUEUE) {}

	async consume(
		onMessage: (
			msg: Payload,
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
					const content = JSON.parse(message.content.toString()) as Payload;
					await onMessage(content, ack, retry);
				} catch (err) {
					ch.nack(message, false, false);
				}
			},
			{ noAck: false },
		);
	}
}
