import { randomUUID } from "node:crypto";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";
import { DepositEventPublisher } from "../../infrastructure/message-broker/deposit-event-publisher";

export class InitDeposit {
	constructor(
		private readonly ledgerRepo: ILedgerRepository,
		private readonly qeuePublisher: DepositEventPublisher,
		private readonly walletAdaptor: IWalletAdaptor,
	) {}

	async execute(
		walletId: string,
		amountNumber: number,
		idempotencyKey: string,
	) {
		const currentWallet = await this.walletAdaptor.findById(walletId);
		if (!currentWallet) {
			throw new Error("wallet_not_found");
		}

		const existingTransfers =
			await this.ledgerRepo.findTransferByIdempotencyKey(idempotencyKey);

		if (existingTransfers) {
			return {
				transferId: existingTransfers.id,
				message: "Deposit already initialized (idempotent)",
			};
		}

		const id = randomUUID();
		const amount = new Money(amountNumber);
		const txId = randomUUID();

		await this.ledgerRepo.createDepositTransaction({
			id,
			walletId,
			amount,
			idempotencyKey,
			txId,
		});

		await this.qeuePublisher.fire({ transferId: id });

		return { transferId: id, idempotencyKey, message: "Deposit initialized" };
	}
}
