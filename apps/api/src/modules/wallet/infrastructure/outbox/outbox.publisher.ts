import prisma from "../../../../../lib/db/prisma";

export const OutboxPublisher = {
	async push(
		tx: any,
		event: {
			aggregateId?: string;
			aggregateType?: string;
			type: string;
			payload: any;
		},
	) {
		const client = tx ?? prisma;
		return client.outboxEvent.create({
			data: {
				aggregateId: event.aggregateId,
				aggregateType: event.aggregateType,
				type: event.type,
				payload: event.payload,
			},
		});
	},
};
