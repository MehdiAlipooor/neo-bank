// import { IOutboxRepository } from "../../application/ports/outbox-repository.port";
// import prisma from "../../../../../lib/db/prisma";


// export class OutboxRepository implements IOutboxRepository {
// 	async add(eventType: string, payload: any) {
// 		await prisma.outbox.create({
// 			data: {
// 				id: crypto.randomUUID(),
// 				eventType,
// 				payload: JSON.stringify(payload),
// 				processed: false,
// 			},
// 		});
// 	}

// 	async getUnprocessed(limit = 50) {
// 		return prisma.outbox.findMany({
// 			where: { processed: false },
// 			take: limit,
// 			orderBy: { createdAt: "asc" },
// 		});
// 	}

// 	async markProcessed(id: string) {
// 		await prisma.outbox.update({
// 			where: { id },
// 			data: { processed: true },
// 		});
// 	}
// }

export {}