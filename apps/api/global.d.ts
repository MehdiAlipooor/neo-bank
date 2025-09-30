declare namespace NodeJS {
	interface Global {
		rabbitPublisher: import("./src/shared/lib/rabbitMq-connector").RabbitMQPublisher;
	}
}
