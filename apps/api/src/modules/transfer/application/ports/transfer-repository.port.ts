import type { Prisma, TransferStatus } from "@prisma/client";
import type { Transfer } from "../../domain/entites/transfer.entity";

export interface TransferRepositoryPort {
	create(
		transfer: Transfer,
		idempotencyKey: string,
		tx: Prisma.TransactionClient,
	): Promise<Transfer>;

	updateStatus(
		id: string,
		status: TransferStatus,
		tx: Prisma.TransactionClient,
	): Promise<void>;

	findById(id: string, status: TransferStatus): Promise<Transfer | null>;

	existsByIdempotencyKey(
		idempotencyKey: string,
		tx: Prisma.TransactionClient,
	): Promise<boolean>;
}
