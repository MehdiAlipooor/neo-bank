import { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";

export class MainWalletDepositEventPublisher extends RabbitMQPublisher {
	constructor(message: any) {
		super("wallet.main.deposit", message);
	}
}
