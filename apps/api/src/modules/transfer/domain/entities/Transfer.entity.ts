import { TransferStatus } from "../enums/transfer-objects.enum";
import { TransferTypes } from "../enums/transfer.enum";

// همان مدلِ شما — فقط نام مدل‌ها را عینا گذاشتم

export class TransferEntity {
	constructor(
		public id: string,
		public type: TransferTypes,
		public amount: bigint,
		public sourceWalletId: string,
		public destIdentifier?: string | null,
		public status: TransferStatus = TransferStatus.CREATED,
		public idempotencyKey?: string | null,
		public metadata?: any,
		public createdAt?: Date,
		public updatedAt?: Date,
	) {}
}
