import { Prisma, PrismaClient } from "@prisma/client";
import { WalletDTO } from "../../domain/dtos/wallet.dto";
import { IWalletAdaptor } from "../../application/ports/wallet-adaptor.port";
import { walletToDto } from "../../application/mappers/wallet-toDto.mapper";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { Wallet } from "../../../wallet/domain/entities/wallet";
import { randomUUID } from "node:crypto";
import { LedgerTransactionType } from "../../domain/entities/ledger-entry.entity";

const prisma = new PrismaClient();

export class WalletAdaptor implements IWalletAdaptor {
	async increaseBalance(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void> {
		await transaction.wallet.update({
			where: { id: walletId },
			data: {
				balance: { increment: amount },
			},
		});
	}

	async increaseAvailable(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void> {
		await transaction.wallet.update({
			where: { id: walletId },
			data: {
				available: { increment: amount },
			},
		});
	}

	async decreaseBalance(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void> {
		const response = await transaction.wallet.update({
			where: { id: walletId },
			data: {
				balance: { decrement: amount },
			},
		});
		console.log(response);
	}

	async decreaseAvailable(
		walletId: string,
		amount: number,
		transaction: Prisma.TransactionClient,
	): Promise<void> {
		await transaction.wallet.update({
			where: { id: walletId },
			data: {
				available: { decrement: amount },
			},
		});
	}

	async internaleDeposit(
		id: string,
		amount: number,
		transactionRef: any,
	): Promise<void> {
		const dbClient = transactionRef ?? prisma;
		await dbClient.wallet.update({
			where: { id },
			data: {
				balance: { increment: amount },
				available: { increment: amount },
			},
		});
	}

	async internaleWithdraw(
		id: string,
		balance: number,
		available: number,
		transactionRef: any,
	): Promise<void> {
		const dbClient = transactionRef ?? prisma;
		await dbClient.wallet.update({
			where: { id },
			data: {
				balance,
				available,
			},
		});
	}

	async findByUserId(userId: string): Promise<WalletDTO | null> {
		const record = await prisma.wallet.findUnique({ where: { userId } });
		if (!record) {
			return null;
		}

		return walletToDto(record);
	}

	async findById(id: string): Promise<any | null> {
		const record = await prisma.wallet.findUnique({ where: { id } });
		if (!record) {
			return null;
		}

		return record;
	}

	async creditDeposit(
		walletId: string,
		amount: Money,
		txId: string,
		transferId?: string,
	): Promise<void> {
		await prisma.$transaction(async (tx) => {
			await tx.wallet.update({
				where: { id: walletId },
				data: {
					balance: { increment: amount.value },
					available: { increment: amount.value },
				},
			});

			const response = await tx.ledgerTransaction.create({
				data: {
					id: randomUUID(),
					transferId: "-",
					type: "DEPOSIT",
				},
			});

			await tx.ledgerEntry.create({
				data: {
					id: crypto.randomUUID(),
					txId: response?.id,
					walletId,
					account: `wallet:${walletId}`,
					amount: amount.value,
					metadata: { note: "Deposit confirmed" },
					type: LedgerTransactionType.DEPOSIT,
				},
			});
		});
	}

	async ebit(walletId: string, amount: Money): Promise<void> {
		await prisma.wallet.update({
			where: { id: walletId },
			data: {
				balance: { decrement: amount.value },
				available: { decrement: amount.value },
			},
		});
	}
}
