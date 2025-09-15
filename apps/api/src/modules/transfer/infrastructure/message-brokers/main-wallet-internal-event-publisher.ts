import { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";

export class MainWalletInternalEventPublisher extends RabbitMQPublisher {
	constructor(message: any) {
		super("wallet.main.intenal", message);
	}
}
