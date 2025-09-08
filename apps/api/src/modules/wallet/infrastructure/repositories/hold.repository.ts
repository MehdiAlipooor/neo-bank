import type { PrismaClient } from "@prisma/client";

import type { IHoldRepository } from "../../application/ports/hold.repository.port";
import { Hold } from "../../domain/entities/hold.entity";
import { HoldStatus } from "../../domain/value-objects/hold-status.vo";

export class HoldRepository implements IHoldRepository {
	constructor(private prisma: PrismaClient) {}

	async create(hold: Hold, tx?: any): Promise<Hold> {
		const client = tx ?? this.prisma;
		const rec = await client.hold.create({
			data: {
				id: hold.id,
				walletId: hold.walletId,
				amount: hold.amount,
				status: hold.status,
				// transferId: hold.transferId ?? null
			},
		});
		return new Hold(rec.id, rec.walletId, rec.amount);
	}

	async update(hold: Hold, tx?: any): Promise<void> {
		const client = tx ?? this.prisma;

		await client.hold.update({
			where: { id: hold.id },
			data: { status: hold.status },
		});
	}

	async findActiveByTransfer(transferId: string, tx?: any): Promise<Hold> {
		const client = tx ?? this.prisma;
		const rows = await client.hold.findMany({
			where: { transferId, status: HoldStatus.ACTIVE },
		});
		return rows.map(
			(r: Hold) => new Hold(r.id, r.walletId, r.amount, r.status, r.createdAt),
		);
	}

	async findById(id: string, tx?: any): Promise<Hold | null> {
		const client = tx ?? this.prisma;
		const record = await client.hold.findUnique({ where: { id } });
		if (!record) {
			return null;
		}

		return new Hold(
			record.id,
			record.walletId,
			record.amount,
			record.status,
			record.createdAt,
		);
	}
}
