import { Prisma, TransferType } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import { ITransferRepository } from "../../application/ports/transfer-repository.port";
import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { TransferTypes } from "../../domain/enums/transfer.enum";

export class TransferRepository implements ITransferRepository {
	async create(
		transfer: Transfer,
		transactionRef: Prisma.TransactionClient,
	): Promise<Transfer> {
		return (await transactionRef.transfer.create({
			data: {
				id: transfer.id,
				sourceWalletId: transfer.sourceWalletId,
				destIdentifier: transfer.destIdentifier,
				amount: transfer.amount,
				status: TransferStatus.CREATED,
				idempotencyKey: transfer.idempotencyKey,
				metadata: transfer.metadata || {},
				type: TransferType.INTERNAL,
			},
		})) as unknown as Transfer;
	}

	async findByIdempotencyKey(
		key: string,
		transaction?: any,
	): Promise<Transfer | null> {
		const record = await (transaction
			? transaction
			: prisma
		).transfer.findUnique({
			where: { idempotencyKey: key },
		});
		if (!record) {
			return null;
		}

		return new Transfer(
			record.id,
			record.type as TransferTypes,
			record.amount as any,
			record.sourceWalletId,
			record.destIdentifier,
			record.status as TransferStatus,
			record.idempotencyKey!,
			record.metadata ?? {},
		);
	}

	async updateStatus(id: string, status: TransferStatus) {
		await prisma.transfer.update({
			where: { id },
			data: { status: status as any },
		});
	}

	async getTransaction(callback: (trasaction: any) => any) {
		return prisma.$transaction(async (tx) => {
			return callback(tx); // tx is valid only inside this callback
		});
	}
}
