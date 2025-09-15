import { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";

export class MainWalletWithdrawEventPublisher extends RabbitMQPublisher {
	constructor(message: any) {
		super("wallet.main.withdraw", message);
	}
}
