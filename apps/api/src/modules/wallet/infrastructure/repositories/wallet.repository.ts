import { PrismaClient } from "@prisma/client";
import type { IWalletRepository } from "../../application/ports/wallet-repository.port";
import { Wallet } from "../../domain/entities/wallet";
import { Money } from "../../domain/value-objects/Money";

const prisma = new PrismaClient();

export class WalletRepository implements IWalletRepository {
	async create(wallet: Wallet): Promise<Wallet> {
		console.log(wallet);
		const record = await prisma.wallet.create({
			data: {
				id: wallet.id,
				userId: wallet.userId,
				balance: wallet.getBalance(),
			},
		});

		return new Wallet(
			record.id,
			record.userId,
			Number(record.balance),
			new Money(0),
		);
	}

	async findById(id: string): Promise<Wallet | null> {
		const record = await prisma.wallet.findUnique({ where: { id } });
		if (!record) {
			return null;
		}

		return new Wallet(
			record.id,
			record.userId,
			Number(record.balance),
			record.available,
		);
	}

	async findByUserId(userId: string): Promise<Wallet | null> {
		const record = await prisma.wallet.findUnique({ where: { userId } });
		if (!record) {
			return null;
		}

		return new Wallet(
			record.id,
			record.userId,
			Number(record.balance),
			record.available,
		);
	}

	async update(wallet: Wallet): Promise<Wallet> {
		const record = await prisma.wallet.update({
			where: { id: wallet.id },
			data: { balance: wallet.getBalance() },
		});

		return new Wallet(
			record.id,
			record.userId,
			Number(record.balance),
			record.available,
		);
	}
}
