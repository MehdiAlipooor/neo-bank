import { Wallet } from "../../../wallet/domain/entities/wallet";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { Hold } from "../../domain/entities/hold.entity";
import { LedgerEntry } from "../../domain/entities/ledger-entry.entity";
import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";

export interface ITransferRepository {
	create: (transfer: Transfer, transactionRef?: any) => Promise<void>;
	findByIdempotencyKey: (key: string) => Promise<Transfer | null>;
	updateStatus: (key: string, status: TransferStatus) => Promise<void>;

	getTransaction: (callback: (transaction: any) => void) => any;

	transferBetweenWallets: (
		sourceWallet: Wallet,
		destWallet: Wallet,
		transfer: Transfer,
		amount: Money,
		hold: Hold,
		ledgerEntries: LedgerEntry[],
	) => Promise<void>;
}
