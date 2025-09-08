import { PrismaClient } from "@prisma/client";
import { WalletDTO } from "../../domain/dtos/wallet.dto";
import { IWalletAdaptor } from "../../application/ports/wallet-adaptor.port";
import { walletToDto } from "../../application/mappers/wallet-toDto.mapper";
import { Money } from "../../../wallet/domain/value-objects/Money";

const prisma = new PrismaClient();

export class WalletAdaptor implements IWalletAdaptor {
	async findByUserId(userId: string): Promise<WalletDTO | null> {
		const record = await prisma.wallet.findUnique({ where: { userId } });
		if (!record) {
			return null;
		}

		return walletToDto(record);
	}

	async findById(id: string): Promise<WalletDTO | null> {
		const record = await prisma.wallet.findUnique({ where: { id } });
		if (!record) {
			return null;
		}

		return walletToDto(record);
	}

	async credit(walletId: string, amount: Money): Promise<void> {
		await prisma.wallet.update({
			where: { id: walletId },
			data: { balance: { increment: amount.value } },
		});
	}

	async ebit(walletId: string, amount: Money): Promise<void> {
		await prisma.wallet.update({
			where: { id: walletId },
			data: { balance: { decrement: amount.value } },
		});
	}
}
