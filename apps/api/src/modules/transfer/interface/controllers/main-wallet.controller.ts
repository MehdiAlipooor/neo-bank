import type { FastifyReply, FastifyRequest } from "fastify";
import { WalletFecad } from "../../../wallet/application/fecads/wallet.fecade";
import { BaseWalletService } from "../../../wallet/application/services/base-wallet.service";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletTransferService } from "../../application/services/main-wallet-transfer.service";
import { DepositMainUseCase } from "../../application/use-cases/initi-deposit-main.use-case";
import { MainWalletDepositWorkflow } from "../../application/workflows/main-wallet-transfer.workflow";
import { MainWalletDepositEventPublisher } from "../../infrastructure/message-brokers/main-wallet-deposit-event-publisher";
import { TransferRepository } from "../../infrastructure/repositories/transfer.reository";

const transferRepo = new TransferRepository();
const walletFecade = new WalletFecad();

export class MainWalletController {
  async deposit(req: FastifyRequest, reply: FastifyReply) {
    const { walletKey, amount, idempotencyKey } = req.body as {
      walletKey: string;
      amount: number;
      idempotencyKey: string;
    };

    const wallet: Wallet | null = await walletFecade.findByKey(walletKey);
    if (!wallet) {
      return reply.status(404).send({ message: "no wallet found" });
    }

    const walletService = new BaseWalletService(wallet);
    const service = new MainWalletTransferService(
      transferRepo,
      walletService,
      idempotencyKey
    );

    const depositUseCase = new DepositMainUseCase(service);

    const workflow = new MainWalletDepositWorkflow(
      depositUseCase,
      new MainWalletDepositEventPublisher()
    );

    const response = await workflow.deposit(wallet, amount);

    return reply.status(200).send(response);
  }
}
