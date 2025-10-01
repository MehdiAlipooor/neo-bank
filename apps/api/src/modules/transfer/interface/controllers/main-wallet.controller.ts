import type { FastifyReply, FastifyRequest } from "fastify";
import { WalletFecade } from "../../../wallet/application/fecads/wallet.fecade";
import { BaseWalletService } from "../../../wallet/application/services/base-wallet.service";
import { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import { MainWalletTransferService } from "../../application/services/main-wallet-transfer.service";
import { DepositUseCase } from "../../application/use-cases/deposit.use-case";
import { DepositWorkflow } from "../../application/workflows/deposit.workflow";
import { TransferRepository } from "../../infrastructure/repositories/transfer.reository";

const transferRepo = new TransferRepository();
const walletFecade = new WalletFecade();

export class MainWalletController {
	async deposit(req: FastifyRequest, reply: FastifyReply) {
		const { walletKey, amount, idempotencyKey } = req.body as {
			walletKey: string;
			amount: number;
			idempotencyKey: string;
		};

		const wallet = await walletFecade.findByKey(walletKey);
		if (!wallet) {
			return reply.status(404).send({ message: "No wallet found" });
		}

		const mainWallet = new MainWallet(
			wallet.walletKey,
			wallet.accountId,
			wallet.balance,
			wallet.available,
		);

		const walletService = new BaseWalletService(mainWallet);
		const transferService = new MainWalletTransferService(
			transferRepo,
			walletService,
			idempotencyKey,
		);

		const depositUseCase = new DepositUseCase<MainWallet>(transferService);

		const workflow = new DepositWorkflow<MainWallet>(depositUseCase);

		try {
			const response = await workflow.deposit(wallet, idempotencyKey, amount);
			return reply.status(200).send(response);
		} catch (err: any) {
			return reply.status(400).send({ message: err.message });
		}
	}
}
