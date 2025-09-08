export interface WalletDTO {
	id: string;
	userId: string;
	balance: number;
	cardNumber?: string | null;
	accountNumber?: string | null;
	shabaNumber?: string | null;
	isRemoved: boolean;
}
