import { Prisma } from "@prisma/client";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { Transfer } from "../../domain/entities/transfer.entity";

export interface ITransferRepository {
	create: (
		transfer: Transfer,
		transactionRef: Prisma.TransactionClient,
	) => Promise<Transfer>;
	findByIdempotencyKey: (
		key: string,
		transaction: Prisma.TransactionClient,
	) => Promise<Transfer | null>;
	updateStatus: (key: string, status: TransferStatus) => Promise<void>;

	getTransaction: (
		callback: (transaction: Prisma.TransactionClient) => void,
	) => any;
}
