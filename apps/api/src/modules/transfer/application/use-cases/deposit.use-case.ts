import type { Prisma } from "@prisma/client";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import type { WalletTransferService } from "../services/wallet-transfer.service";

export class DepositUseCase<T extends Wallet> {
	constructor(private service: WalletTransferService<T>) {}

	async execute(
		wallet: T,
		idempotencyKey: string,
		amount: number,
		tx: Prisma.TransactionClient,
	) {
		return await this.service.deposit(wallet, idempotencyKey, amount, tx);
	}
}
