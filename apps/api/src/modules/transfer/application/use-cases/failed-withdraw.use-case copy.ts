import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import { IHoldRepository } from "../../../wallet/application/ports/hold.repository.port";
import { ITransferRepository } from "../ports/transfer-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";
import { Hold } from "../../domain/entities/hold.entity";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { HoldStatus } from "../../domain/value-objects/hold-status.vo";
import { Transfer } from "../../domain/entities/transfer.entity";
import { randomUUID } from "node:crypto";
import { TransferTypes } from "../../domain/enums/transfer.enum";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import {
	LedgerEntry,
	LedgerEntryAccoun,
	LedgerTransactionType,
} from "../../domain/entities/ledger-entry.entity";
import { ILedgerRepository } from "../ports/ledger-repository.port";

export class FailedWithdraw {
	constructor(
		private readonly walletAdapter: IWalletAdaptor,
		private readonly transferRepo: ITransferRepository,
		private readonly holdRepo: IHoldRepository,
		private readonly ledgerRepo: ILedgerRepository,
	) {}

	async execute(
		destAccountId: string,
		sourceWalletId: string,
		amount: number,
		holdId: string,
		idempotencyKey: string,
	) {
		let transferId = "";

		await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
			/**
			 * @description Release hold/
			 */
			const hold = new Hold(
				holdId,
				sourceWalletId,
				new Money(amount),
				HoldStatus.RELEASED,
			);
			await this.holdRepo.update(hold, transaction);

			/**
			 * @description Restore wallet available
			 */
			await this.walletAdapter.increaseBalance(
				sourceWalletId,
				amount,
				transaction,
			);

			/**
			 * @description Create transfer (FAILED)
			 */
			const existing = await this.transferRepo.findByIdempotencyKey(
				idempotencyKey,
				transaction,
			);
			const transfer =
				existing ??
				(await this.transferRepo.create(
					new Transfer(
						randomUUID(),
						TransferTypes.WITHDRAW,
						amount,
						sourceWalletId,
						destAccountId,
						TransferStatus.FAILED,
						idempotencyKey,
						{},
					),
					transaction,
				));

			transferId = transfer.id;

			/**
			 * @description Ledger entry to record failure
			 */
			const ledgerEntry = new LedgerEntry(
				randomUUID(),
				transfer.id,
				sourceWalletId,
				LedgerEntryAccoun.WALLET,
				new Money(amount),
				{ note: "withdraw failed, hold released" },
			);

			await this.ledgerRepo.createLedgerTxWithEntry(
				{
					txId: randomUUID(),
					transferId: transfer.id,
					type: LedgerTransactionType.WITHDRAW_PENDING,
					entries: [ledgerEntry],
				},
				transaction,
			);
		});

		return transferId;
	}
}
