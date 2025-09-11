import { randomUUID } from "node:crypto";
import { Money } from "../../../wallet/domain/value-objects/Money";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { ILedgerRepository } from "../ports/ledger-repository.port";
import { IWalletAdaptor } from "../ports/wallet-adaptor.port";

export class ConfirmDeposit {
	constructor(
		private readonly ledgerRepo: ILedgerRepository,
		private readonly walletAdaptor: IWalletAdaptor,
	) {}

	async execute(transferId: string, success: boolean) {
		const transfer = await this.ledgerRepo.findTransferById(transferId);
		if (!transfer) {
			throw new Error("transfer_not_found");
		}

		if (!success) {
			await this.ledgerRepo.updateTransferStatus(
				transferId,
				TransferStatus.FAILED,
			);
			return { status: "failed" };
		}

		await this.walletAdaptor.creditDeposit(
			transfer.sourceWalletId,
			new Money(parseFloat(transfer.amount.toString())),
			randomUUID(),
			transferId,
		);
		await this.ledgerRepo.updateTransferStatus(
			transferId,
			TransferStatus.COMPLETED,
		);
		return { status: "COMPLETED" as const };
	}
}
