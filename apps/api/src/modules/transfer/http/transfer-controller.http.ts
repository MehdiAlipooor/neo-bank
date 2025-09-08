import { FastifyReply, FastifyRequest } from "fastify";
import { LedgerRepository } from "../infrastructure/repositories/ledger.repository";
import { RabbitMqPublisher } from "../infrastructure/message-broker/rabbitMQ-publisher";
import { InitDeposit } from "../application/use-cases/init-deposit.use-case";
import { WalletAdaptor } from "../infrastructure/adaptors/wallet.adaptor";
import { ConfirmDeposit } from "../application/use-cases/confirm-deposit.use-case";

const ledgerRepo = new LedgerRepository();
const publisher = new RabbitMqPublisher();
const walletAdapter = new WalletAdaptor();

export class TransferController {
	static async initDeposit(
		req: FastifyRequest<{
			Body: { walletId: string; amount: number; idempotencyKey: string };
		}>,
		reply: FastifyReply,
	) {
		try {
			const { walletId, amount, idempotencyKey } = req.body;

			const usecase = new InitDeposit(ledgerRepo, publisher, walletAdapter);
			const result = await usecase.execute(
				String(walletId),
				Number(amount),
				idempotencyKey,
			);

			return reply.status(201).send({
				message: result?.message || "Unknown message",
				transferId: result.transferId,
			});
		} catch (e: any) {
			return reply.status(201).send({
				message: e.message,
			});
		}
	}

	static async confirmDeposit(
		req: FastifyRequest<{ Body: { transferId: string; success: boolean } }>,
		reply: FastifyReply,
	) {
		try {
			const { transferId, success } = req.body;

			const usecase = new ConfirmDeposit(ledgerRepo, walletAdapter);
			const result = await usecase.execute(
				String(transferId),
				Boolean(success),
			);

			return reply.status(201).send({
				message: result,
				transferId: transferId,
			});
		} catch (e: any) {
			return reply.status(201).send({
				message: e.message,
			});
		}
	}
}
