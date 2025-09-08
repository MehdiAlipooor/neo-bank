import { Money } from "../../../wallet/domain/value-objects/Money";
import { RabbitMqPublisher } from "../../infrastructure/message-broker/rabbitMQ-publisher";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";

export class InitDeposit {
	constructor(
		private readonly ledgerRepo: ILedgerRepository,
		private readonly qeuePublisher: RabbitMqPublisher,
		private readonly walletAdaptor: IWalletAdaptor,
	) {}

	async execute(
		walletId: string,
		amountNumber: number,
		idempotencyKey: string,
	) {
		console.log("STEP_ONE");
		const currentWallet = await this.walletAdaptor.findById(walletId);
		if (!currentWallet) {
			throw new Error("wallet_not_found");
		}

		console.log("STEP_TWO");
		const existingTransfers =
			await this.ledgerRepo.findTransferByIdempotencyKey(idempotencyKey);
		if (existingTransfers) {
			return {
				transferId: existingTransfers.id,
				message: "Deposit already initialized (idempotent)",
			};
		}

		console.log("STEP_THREE");
		const id = crypto.randomUUID();
		const amount = new Money(amountNumber);
		const txId = crypto.randomUUID();

		await this.ledgerRepo.createDepositTransaction({
			id,
			walletId,
			amount,
			idempotencyKey,
			txId,
		});

		// await this.qeuePublisher.publishDepositVerify({ transferId: id });
		// const pub = new RabbitMqPublisher();
		await this.qeuePublisher.publishDepositVerify({ transferId: id });

		console.log("STEP_FIVE");
		return { transferId: id, idempotencyKey, message: "Deposit initialized" };
	}
}
