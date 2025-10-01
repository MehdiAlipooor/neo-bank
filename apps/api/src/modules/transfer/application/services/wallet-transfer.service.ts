// biome-ignore assist/source/organizeImports: <Prisma sorting has bug in mantine>
import type { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { LedgerFecad } from "../../../ledger/application/fecades/ledger-fecade";
import type { LedgerFecadePort } from "../../../ledger/application/ports/ledger-fecade.port";
import { LedgerTransactionFactory } from "../../../ledger/application/services/ledger-transaction-factory.service";
import type { BaseWalletService } from "../../../wallet/application/services/base-wallet.service";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { Transfer } from "../../domain/entites/transfer.entity";
import type { TransferRepositoryPort } from "../ports/transfer-repository.port";

export class WalletTransferService<T extends Wallet> {
	ledgerFecade: LedgerFecadePort;

	constructor(
		private transferRepo: TransferRepositoryPort,
		private walletService: BaseWalletService<any>,
		private idempotencyKey: string,
	) {
		this.ledgerFecade = new LedgerFecad();
	}

	async deposit(
		wallet: T,
		idempotencyKey: string,
		amount: number,
		tx: Prisma.TransactionClient,
	) {
		await this.checkIdempotency(tx);

		const transfer = await this.transferRepo.create(
			new Transfer(
				randomUUID(),
				wallet.walletKey,
				"DEPOSIT",
				amount,
				"CREATED",
				randomUUID(),
			),
			idempotencyKey,
			tx,
		);

		const ledgerTx = await LedgerTransactionFactory.createLedgerTransaction(
			"DEPOSIT",
			wallet,
			amount,
			"PENDING",
			transfer.transferKey,
		);

		await this.ledgerFecade.saveTransaction(ledgerTx, tx);

		await this.walletService.deposit(amount, {
			ledgerTxKey: ledgerTx.ledgerTxKey,
		});

		return transfer;
	}

	private async checkIdempotency(tx: Prisma.TransactionClient) {
		const exists = await this.transferRepo.existsByIdempotencyKey(
			this.idempotencyKey,
			tx,
		);
		if (exists) throw new Error("IdempotencyKey already exists");
	}
}
