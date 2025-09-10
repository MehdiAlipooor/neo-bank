import { Money } from "../../../wallet/domain/value-objects/Money";
import {
	LedgerEntry,
	LedgerTransactionType,
} from "../../domain/entities/ledger-entry.entity";
import { Transfer } from "../../domain/entities/transfer.entity";
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

	createLedgerTxWithEntry(
		params: {
			txId: string;
			transferId?: string | null;
			type: LedgerTransactionType;
			entries: LedgerEntry[];
		},
		transactionRef?: any,
	): Promise<void>;

	findTransferById(id: string): Promise<Transfer | null>;
	findTransferByIdempotencyKey(
		idempotencyKey: string,
	): Promise<Transfer | null>;
	updateTransferStatus(id: string, status: TransferStatus): Promise<void>;

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
