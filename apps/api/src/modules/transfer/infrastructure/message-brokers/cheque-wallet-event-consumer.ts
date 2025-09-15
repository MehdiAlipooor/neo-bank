import { ChannelModel } from "amqplib";
import { RabbitMQEventConsumer } from "../../../../shared/lib/rabbitMq-consumer";

export class ChequeWalletEventConsumer extends RabbitMQEventConsumer {
	constructor(connection: ChannelModel) {
		super(connection, "wallet.events", "cheque-wallet-service");

		this.on(/^wallet\.cheque\./, async (routingKey, event) => {
			//   await ProcessChequeEvent(routingKey, event);
		});
	}
}
