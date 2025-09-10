import { Prisma } from "@prisma/client";
import { Wallet } from "../../../wallet/domain/entities/wallet";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { WalletDTO } from "../../domain/dtos/wallet.dto";

export interface IWalletAdaptor {
	findByUserId(userId: string): Promise<WalletDTO | null>;
	findById(id: string): Promise<Wallet | null>;

	creditDeposit(
		walletId: string,
		amount: Money,
		txId: string,
		transferId?: string,
	): Promise<void>;

	internaleDeposit(
		walletId: string,
		amount: number,
		transactionRef?: any,
	): Promise<void>;
	internaleWithdraw(
		walletId: string,
		amount: number,
		available: number,
		transactionRef?: any,
	): Promise<void>;

	ebit(walletId: string, amount: Money): Promise<void>;

	increaseBalance(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void>;
	increaseAvailable(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void>;

	decreaseBalance(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void>;
	decreaseAvailable(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void>;
}
