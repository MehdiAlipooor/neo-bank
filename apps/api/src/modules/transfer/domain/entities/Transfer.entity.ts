import { TransferStatus } from "../enums/transfer-objects.enum";
import { TransferTypes } from "../enums/transfer.enum";

export class Transfer {
	constructor(
		public id: string,
		public type: TransferTypes,
		public amount: number,
		public sourceWalletId: string,
		public destIdentifier?: string | null,
		public status: TransferStatus = TransferStatus.CREATED,
		public idempotencyKey?: string | null,
		public metadata?: any,
		public createdAt?: Date,
		public updatedAt?: Date,
	) {}

	markCompleted() {
		this.status = TransferStatus.COMPLETED;
	}

	markFailed() {
		this.status = TransferStatus.FAILED;
	}

	markReserved() {
		this.status = TransferStatus.RESERVED;
	}
}
