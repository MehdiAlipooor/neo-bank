import type { ChannelModel } from "amqplib";
import { RabbitMQEventConsumer } from "../../../../shared/lib/rabbitMq-consumer";

export class MainWalletEventConsumer extends RabbitMQEventConsumer {
	constructor(connection: ChannelModel) {
		super(connection, "wallet.events", "main-wallet-service");

		this.on(/^wallet\.main\./, async (_routingKey, _event) => {
			//   await ProcessMainWalletEvent(routingKey, event);
		});
	}
}
