import type { PrismaClient } from "@prisma/client";

import type { IHoldRepository } from "../../application/ports/hold.repository.port";
import { Hold } from "../../../transfer/domain/entities/hold.entity";
import { HoldStatus } from "../../../transfer/domain/value-objects/hold-status.vo";
import prisma from "../../../../../lib/db/prisma";

export class HoldRepository implements IHoldRepository {
	async findActiveByWalletId(walletId: string, tx?: any): Promise<Hold[]> {
		const client = tx ?? prisma;
		const rows = await client.hold.findMany({
			where: { walletId, status: HoldStatus.ACTIVE },
		});

		return rows.map(
			(r: Hold) => new Hold(r.id, r.walletId, r.amount, r.status, r.createdAt),
		);
	}

	async findActiveById(id: string, tx?: any): Promise<Hold[]> {
		const client = tx ?? prisma;
		const rows = await client.hold.findMany({
			where: { id, status: HoldStatus.ACTIVE },
		});

		return rows.map(
			(r: Hold) => new Hold(r.id, r.walletId, r.amount, r.status, r.createdAt),
		);
	}

	async create(hold: Hold, tx?: any): Promise<Hold> {
		// const client = tx ?? prisma;
		const rec = await tx.hold.create({
			data: {
				id: hold.id,
				walletId: hold.walletId,
				amount: hold.amount.value,
				status: hold.status,
			},
		});
		return new Hold(rec.id, rec.walletId, rec.amount);
	}

	async update(hold: Hold, tx?: any): Promise<void> {
		// const client = tx ?? prisma;

		await tx.hold.update({
			where: { id: hold.id },
			data: { status: hold.status },
		});
	}

	async findActiveByTransfer(transferId: string, tx?: any): Promise<Hold> {
		const client = tx ?? prisma;
		const rows = await client.hold.findMany({
			where: { transferId, status: HoldStatus.ACTIVE },
		});
		return rows.map(
			(r: Hold) => new Hold(r.id, r.walletId, r.amount, r.status, r.createdAt),
		);
	}

	async findById(id: string, tx?: any): Promise<Hold | null> {
		const client = tx ?? prisma;
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
