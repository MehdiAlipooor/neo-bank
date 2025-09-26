import type { TransferStatus } from "@prisma/client";
import type { Transfer } from "../../domain/entites/transfer.entity";

export interface TransferRepositoryPort {
	create(transfer: Transfer): Promise<Transfer>;
	updateStatus(id: string, status: TransferStatus): Promise<void>;
	findById(id: string, status: TransferStatus): Promise<Transfer | null>;
}
