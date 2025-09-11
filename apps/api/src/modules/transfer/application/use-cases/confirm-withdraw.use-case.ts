import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import { IHoldRepository } from "../../../wallet/application/ports/hold.repository.port";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { ITransferRepository } from "../ports/transfer-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";
import { Hold } from "../../domain/entities/hold.entity";
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
import { Money } from "../../../wallet/domain/value-objects/Money";

export class ConfirmWithdraw {
	constructor(
		private readonly walletAdapter: IWalletAdaptor,
		private readonly transferRepo: ITransferRepository,
		private readonly ledgerRepo: ILedgerRepository,
		private readonly holdRepo: IHoldRepository,
	) {}

	async execute(
		destAccountId: string,
		sourceWalletId: string,
		amount: number,
		holdId: string,
		idempotencyKey: string,
	) {
		const moneyAmount = new Money(amount);
		let transferId: string = "";

		await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
			/**
			 * @description Consume hold
			 */
			const hold = new Hold(
				holdId,
				sourceWalletId,
				new Money(amount),
				HoldStatus.CONSUMED,
			);
			await this.holdRepo.update(hold, transaction);

			/**
			 * @description Decrease wallet balance
			 */
			await this.walletAdapter.decreaseBalance(
				sourceWalletId,
				amount,
				transaction,
			);

			/**
			 * @description Create transfer (idempotency safe)
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
						TransferStatus.COMPLETED,
						idempotencyKey,
						{},
					),
					transaction,
				));

			transferId = transfer.id;

			/**
			 * @description Ledger entries (double-entry: wallet debit, bank credit)
			 */
			const ledgerEntries = [
				new LedgerEntry(
					randomUUID(),
					transfer.id,
					sourceWalletId,
					LedgerEntryAccoun.WALLET,
					moneyAmount,
					{ note: "withdraw debit" },
				),
				new LedgerEntry(
					randomUUID(),
					transfer.id,

					/**
					 * @ToDo we should have to store this
					 */
					sourceWalletId,
					LedgerEntryAccoun.EXTERNAL,
					moneyAmount,
					{ note: "withdraw credit" },
				),
			];

			await this.ledgerRepo.createLedgerTxWithEntry(
				{
					txId: randomUUID(),
					transferId: transfer.id,
					type: LedgerTransactionType.WITHDRAW_SETTLED,
					entries: ledgerEntries,
				},
				transaction,
			);
		});

		return transferId;
	}
}
