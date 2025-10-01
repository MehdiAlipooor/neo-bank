import { type Prisma, TransferStatus } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import type { LedgerFecadePort } from "../../../ledger/application/ports/ledger-fecade.port";
import type { WalletFecadePort } from "../../../wallet/application/ports/wallet-fecade.port";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { Money } from "../../../wallet/domain/value-objects/money.value-object";
import type { Transfer } from "../../domain/entites/transfer.entity";
import type { TransferRepositoryPort } from "../ports/transfer-repository.port";

// تجربه با End-to-End Testing (Cypress یا Playwright) و رویکردهای TDD/BDD

export class DepositSettlementWorkflow<T extends Wallet> {
	constructor(
		private readonly transferRepo: TransferRepositoryPort,
		private readonly ledgerFecade: LedgerFecadePort,
		private readonly walletFecade: WalletFecadePort,
	) {}

	async execute({ transfer, wallet }: { transfer: Transfer; wallet: T }) {
		await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
			const ledgerTransaction = await this.ledgerFecade.updateTransactionStatus(
				transfer.transferKey,
				TransferStatus.SETTLED,
				transaction,
			);

			const amount = ledgerTransaction?.ledgerEntries?.[0]?.amount;
			const moneyAmount = new Money(Number(amount)).value;
			if (Number.isNaN(moneyAmount) || moneyAmount === Infinity) {
				throw new Error("The amount type is incorrect");
			}

			await this.transferRepo.updateStatus(
				transfer.id,
				TransferStatus.SETTLED,
				transaction,
			);

			await this.walletFecade.updateAmount(
				wallet.walletKey,
				moneyAmount,
				moneyAmount,
				transaction,
			);
		});
	}
}
