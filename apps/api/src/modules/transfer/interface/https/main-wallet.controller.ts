import type { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";
import { BaseWalletService } from "../../../wallet/application/services/base-wallet.service";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletTransferService } from "../../application/services/main-wallet-transfer.service";
import { DepositMainUseCase } from "../../application/use-cases/deposit-main.usecase";
import { InternalTransferMainUseCase } from "../../application/use-cases/internal-transfer-main.usecase";
import { WithdrawMainUseCase } from "../../application/use-cases/withdraw-main.usecase";
import { MainWalletTransferWorkflow } from "../../application/workflows/main-wallet-transfer.workflow";
import { TransferRepository } from "../../infrastructure/repositories/transfer.reository";

export class MainWalletController {
	constructor(
		private publisher: RabbitMQPublisher,
		private walletRepo: any, // implement your wallet repo
	) {}

	async deposit(req: any, _res: any) {
		const { walletKey } = req.body;
		const wallet: Wallet = await this.walletRepo.findByKey(walletKey);

		const walletService = new BaseWalletService(wallet);
		const transferRepo = new TransferRepository();
		const service = new MainWalletTransferService(transferRepo, walletService);

		// const depositUC = new (await import("../../application/use-cases/deposit-main.usecase")).DepositMainUseCase(service);
		const depositUC = new DepositMainUseCase(service);
		const withdrawUC = new WithdrawMainUseCase(service);
		const internalUC = new InternalTransferMainUseCase(service);

		const _workflow = new MainWalletTransferWorkflow(
			depositUC,
			withdrawUC,
			internalUC,
			this.publisher,
		);
		// const result = await workflow.deposit(wallet, Number(amount));
		// res.json(result);
	}
}
