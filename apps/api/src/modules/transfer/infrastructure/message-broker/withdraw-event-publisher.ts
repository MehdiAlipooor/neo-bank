import {
	getRabbitChannel,
	WITHDRAW_EXCHANGE,
} from "../../../../../lib/queue/rabbitMq";

export class WithdrawEvenetPublisher {
	async fire(payload: {
		destAccountId: string;
		sourceWalletId: string;
		amount: number;
		holdId: string;
		idempotencyKey: string;
	}) {
		const ch = await getRabbitChannel();

		ch.publish(
			WITHDRAW_EXCHANGE,
			"route",
			Buffer.from(JSON.stringify(payload)),
			{ persistent: true },
		);
	}
}
