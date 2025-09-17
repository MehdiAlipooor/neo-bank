import { FastifyReply, FastifyRequest } from "fastify";
import { CreateWalletDTO } from "../../application/dtos/create-wallet.dto";
import { CreateWallet } from "../../application/use-cases/create-wallet.use-case";
import { WalletRepository } from "../../infrastructure/repositories/wallet.repository";

const walletRepo = new WalletRepository();

export class WalletController {
	async createWallet(req: FastifyRequest, reply: FastifyReply) {
		const useCase = new CreateWallet(walletRepo);
		const result = await useCase.execute(req.body as CreateWalletDTO);
		reply.send(result);
	}
}
