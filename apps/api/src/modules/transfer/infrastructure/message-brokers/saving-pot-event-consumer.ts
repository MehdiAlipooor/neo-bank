import { ChannelModel } from "amqplib";
import { RabbitMQEventConsumer } from "../../../../shared/lib/rabbitMq-consumer";

export class SavingPotEventConsumer extends RabbitMQEventConsumer {
	constructor(connection: ChannelModel) {
		super(connection, "wallet.events", "main-wallet-service");

		this.on(/^wallet\.savingPot\./, async (routingKey, event) => {
			//   await ProcessMainWalletEvent(routingKey, event);
		});
	}
}
