import type { FastifyReply, FastifyRequest } from "fastify";
import { WalletRepository } from "../infrastructure/repositories/wallet.repository";
import { CreateWallet } from "../application/use-cases/create-wallet";
import { GetWalletBalance } from "../application/use-cases/get-wallet-balance";
import { LegacyDepositFound } from "../application/use-cases/legacy-deposit-found";
import { LegacyWithdrawFunds } from "../application/use-cases/legacy-withdraw-fund";

const walletRepo = new WalletRepository();

export class WalletController {
	async createWallet(req: FastifyRequest, reply: FastifyReply) {
		const { userId } = req.body as { userId: string };
		const useCase = new CreateWallet(walletRepo);
		const result = await useCase.execute({ userId });
		reply.send(result);
	}

	async depositFunds(req: FastifyRequest, reply: FastifyReply) {
		const { walletId, amount } = req.body as {
			walletId: string;
			amount: number;
		};
		const useCase = new LegacyDepositFound(walletRepo);
		const result = await useCase.execute({ walletId, amount });
		reply.send(result);
	}

	async withdrawFunds(req: FastifyRequest, reply: FastifyReply) {
		const { walletId, amount } = req.body as {
			walletId: string;
			amount: number;
		};
		const useCase = new LegacyWithdrawFunds(walletRepo);
		const result = await useCase.execute({ walletId, amount });
		reply.send(result);
	}

	async getBalance(req: FastifyRequest, reply: FastifyReply) {
		const { id } = req.params as { id: string };
		const useCase = new GetWalletBalance(walletRepo);
		const balance = await useCase.execute(id);
		reply.send({ walletId: id, balance });
	}
}
