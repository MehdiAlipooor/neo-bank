import { randomUUID } from "node:crypto";
import { IHoldRepository } from "../../../wallet/application/ports/hold.repository.port";
import { Wallet } from "../../../wallet/domain/entities/wallet";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { Hold } from "../../domain/entities/hold.entity";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";
import { HoldStatus } from "../../domain/value-objects/hold-status.vo";
import prisma from "../../../../../lib/db/prisma";
import { Prisma } from "@prisma/client";
import { WithdrawEvenetPublisher } from "../../infrastructure/message-broker/withdraw-event-publisher";

export class InitWithdraw {
	constructor(
		private readonly holdRepo: IHoldRepository,
		private readonly ledgerRepo: ILedgerRepository,
		private readonly qeuePublisher: WithdrawEvenetPublisher,
		private readonly walletAdaptor: IWalletAdaptor,
	) {}

	async execute(
		souceWalletId: string,
		destAccountId: string,
		amount: number,
		idempotencyKey: string,
	) {
		/**
		 * @description Check idempotency key
		 */

		await this.checkIdempotency(idempotencyKey);

		const amountMoney = new Money(amount);

		const initialWalletData = await this.checkSourceWallet(souceWalletId);
		const wallet = await this.checkWalletBalance(
			initialWalletData,
			amountMoney,
		);

		const transferId = randomUUID();

		await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
			const hold = await this.holdRepo.create(
				new Hold(randomUUID(), wallet.id, amountMoney, HoldStatus.ACTIVE),
				tx,
			);

			/**
			 * @description Create hold
			 */

			await this.qeuePublisher.fire({
				destAccountId,
				sourceWalletId: wallet.id,
				amount,
				holdId: hold.id,
				idempotencyKey,
			});

			/**
			 * @description Update wallet available
			 */
			await this.walletAdaptor.decreaseAvailable(wallet.id, amount, tx);
		});

		return { transferId, idempotencyKey, message: "Withdraw initialized" };
	}

	private async checkSourceWallet(walletId: string) {
		const wallet = await this.walletAdaptor.findById(walletId);
		if (!wallet) {
			throw new Error("no_wallet_founce");
		}

		return wallet;
	}

	private async checkWalletBalance(
		sourceWallet: Wallet,
		amount: Money,
	): Promise<Wallet> {
		const wallt = new Wallet(
			sourceWallet.id,
			sourceWallet.userId,
			sourceWallet.balance.value,
			sourceWallet.available,
		);

		wallt.withdraw(amount);
		wallt.createHold(amount, "");

		return wallt;
	}

	private async checkIdempotency(idempotencyKey: string) {
		const existing =
			await this.ledgerRepo.findTransferByIdempotencyKey(idempotencyKey);
		if (existing) throw new Error("transfer_already_exists");
	}
}
