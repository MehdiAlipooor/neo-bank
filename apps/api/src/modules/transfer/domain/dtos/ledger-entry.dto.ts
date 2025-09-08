import { Money } from "../../../wallet/domain/value-objects/Money";

export interface LedgerEntryDTO {
	id: string;
	txId: string;
	walletId?: string | null;
	account: string;
	amount: Money;
	metadata?: any;
	createdAt: Date;
}
