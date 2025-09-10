import { Money } from "../../../wallet/domain/value-objects/Money";
import { Transfer } from "../../domain/entities/transfer.entity";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { ITransferRepository } from "../ports/transfer-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";
import { TransferTypes } from "../../domain/enums/transfer.enum";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import {
	LedgerEntry,
	LedgerEntryAccoun,
	LedgerTransactionType,
} from "../../domain/entities/ledger-entry.entity";
import { randomUUID } from "node:crypto";
import { IHoldRepository } from "../../../wallet/application/ports/hold.repository.port";
import { Hold } from "../../domain/entities/hold.entity";
import { HoldStatus } from "../../domain/value-objects/hold-status.vo";
import { Wallet } from "../../../wallet/domain/entities/wallet";
import prisma from "../../../../../lib/db/prisma";

export class InternalTransfer {
	constructor(
		private readonly ledgerRepo: ILedgerRepository,
		private readonly walletAdapter: IWalletAdaptor,
		private readonly transferRepo: ITransferRepository,
		private readonly holdRepo: IHoldRepository,
	) {}

	async execute(
		sourceWalletId: string,
		destWalletId: string,
		amount: number,
		idempotencyKey: string,
		metadata?: Record<string, any>,
	) {
		// 1️⃣ Check idempotency
		await this.checkIdempotency(idempotencyKey);

		// SourceWallet
		const sWallet = await this.walletAdapter.findById(sourceWalletId);

		// DestWallet
		const dWallet = await this.walletAdapter.findById(destWalletId);

		if (!sWallet) throw new Error("sourceWallet_not_found");
		if (!dWallet) throw new Error("destWallet_not_found");

		const sourceWallet = await this.getSourceWallet(sWallet, amount);

		//  Create init hold
		const moneyAmount = new Money(amount);
		const Initialhold = new Hold(
			randomUUID(),
			sourceWallet.id,
			new Money(moneyAmount.value),
			HoldStatus.ACTIVE,
		);

		const transfer = new Transfer(
			randomUUID(),
			TransferTypes.TRANSFER,
			amount,
			sourceWallet.id,
			dWallet.id,
			TransferStatus.CREATED,
			idempotencyKey,
			metadata,
		);

		// 6️⃣ Create ledger entries domain objects
		const ledgerEntries = [
			new LedgerEntry(
				randomUUID(),
				transfer.id,
				sourceWallet.id,
				LedgerEntryAccoun.WALLET,
				moneyAmount,
				metadata,
			),
			new LedgerEntry(
				randomUUID(),
				transfer.id,
				dWallet.id,
				LedgerEntryAccoun.WALLET,
				moneyAmount,
				metadata,
			),
		];

		await prisma.$transaction(async (transaction: any) => {
			/**
			 * @description Create init hold
			 */
			const initialHold = await this.holdRepo.create(Initialhold, transaction);

			/**
			 * @description Update source wallet(Decrease amount)
			 */
			await this.walletAdapter.internaleWithdraw(
				sourceWallet.id,
				sourceWallet.balance.value,
				sourceWallet.available.value,
				transaction,
			);

			/**
			 * @description Update dest wallet(Increase amount)
			 */
			await this.walletAdapter.internaleDeposit(
				destWalletId,
				amount,
				transaction,
			);

			/**
			 * @description Create transfer
			 */
			await this.transferRepo.create(transfer, transaction);

			/**
			 * @description Create ledger entries
			 */
			await this.ledgerRepo.createLedgerTxWithEntry(
				{
					txId: randomUUID(),
					transferId: "",
					type: LedgerTransactionType.TRANSFER,
					entries: ledgerEntries,
				},
				transaction,
			);

			const cosumedhold = new Hold(
				initialHold.id,
				initialHold.walletId,
				initialHold.amount,
				HoldStatus.CONSUMED,
			);

			/**
			 * @description Create cosumed hold
			 */
			await this.holdRepo.update(cosumedhold, transaction);
		});

		transfer.markCompleted();

		return transfer;
	}

	private async getSourceHolds(sourceWalletId: string) {
		return await this.holdRepo.findActiveByWalletId(sourceWalletId);
	}

	private async getSourceWallet(
		wallet: Wallet,
		amount: number,
	): Promise<Wallet> {
		const sourceHolds = await this.getSourceHolds(wallet.id);
		const amountMoney = new Money(amount);

		const sourceWallet = new Wallet(
			wallet.id,
			wallet.userId,
			wallet.balance.value,
			wallet.available,
			sourceHolds,
			wallet.cardNumber,
			wallet.accountNumber,
			wallet.shabaNumber,
		);

		sourceWallet.withdraw(amountMoney);
		sourceWallet.createHold(amountMoney, "");

		return sourceWallet;
	}

	private async checkIdempotency(idempotencyKey: string) {
		const existing =
			await this.ledgerRepo.findTransferByIdempotencyKey(idempotencyKey);
		if (existing) throw new Error("transfer_already_exists");
	}
}
