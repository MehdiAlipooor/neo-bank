import { Money } from "../../../wallet/domain/value-objects/Money";
import { TransferEntity } from "../../domain/entities/Transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";

export interface ILedgerRepository {
	createTransfer(transfer: {
		id: string;
		type: string;
		amount: Money;
		sourceWalletId: string;
		destIdentifier?: string | null;
		metadata?: any;
		idempotencyKey: string;
	}): Promise<void>;

	createLedgerTxWithEntry(params: {
		txId: string;
		transferId?: string | null;
		type: string;
		entry: {
			id: string;
			walletId?: string | null;
			account: string;
			amount: Money;
			metadata?: any;
		};
	}): Promise<void>;

	findTransferById(id: string): Promise<TransferEntity | null>;
	findTransferByIdempotencyKey(
		idempotencyKey: string,
	): Promise<TransferEntity | null>;
	updateTransferStatus(id: string, status: TransferStatus): Promise<void>;
	findAllCreatedTransfers(limit?: number): Promise<TransferEntity[]>;

	createDepositTransaction({
		id,
		walletId,
		amount,
		idempotencyKey,
		txId,
	}: {
		id: string;
		walletId: string;
		amount: Money;
		idempotencyKey: string;
		txId: string;
	}): Promise<void>;
}
