import {
	DEPOSIT_EXCHANGE,
	getRabbitChannel,
} from "../../../../../lib/queue/rabbitMq";

export class RabbitMqPublisher {
	async publishDepositVerify(payload: { transferId: string }) {
		const ch = await getRabbitChannel();

		ch.publish(
			DEPOSIT_EXCHANGE,
			"route",
			Buffer.from(JSON.stringify(payload)),
			{ persistent: true },
		);
	}
}
