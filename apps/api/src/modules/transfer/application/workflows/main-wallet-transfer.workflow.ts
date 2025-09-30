import type { Prisma } from "@prisma/client";
import { QUEUES } from "../../../../../enviroment";
import prisma from "../../../../../lib/db/prisma";
import { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";
import { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletPolicy } from "../../../wallet/domain/policies/main-wallet.policy";
import type { DepositMainUseCase } from "../use-cases/initi-deposit-main.use-case";

export class MainWalletDepositWorkflow {
  constructor(private depositUC: DepositMainUseCase) {}

  async deposit(wallet: Wallet, idempotencyKey: string, amount: number) {
    const mainWallet = new MainWallet(
      wallet.walletKey,
      wallet.accountId,
      wallet.balance,
      wallet.available,
      new MainWalletPolicy()
    );

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const transfer = await this.depositUC.execute(
        mainWallet,
        idempotencyKey,
        amount,
        tx
      );

      const messageObject = {
        transfer,
        wallet,
        amount,
      };

      const publisher = new RabbitMQPublisher();

      await publisher.publish<any>(
        QUEUES.WALLET.MAIN.DEPOSIT.CREATE,
        messageObject
      );

      return transfer;
    });
  }
}

// export class MainWalletTransferWorkflow {
// 	constructor(
// 		private depositUC: DepositMainUseCase,
// 		private withdrawUC: WithdrawMainUseCase,
// 		private internalUC: InternalTransferMainUseCase,
// 		private eventPublisher: RabbitMQPublisher,
// 	) {}

// 	async deposit(wallet: Wallet, amount: number) {
// 		const transfer = await this.depositUC.execute(wallet, amount);

// 		await this.eventPublisher.publish("wallet.main.deposit.created", {
// 			walletKey: wallet.walletKey,
// 			amount,
// 			transferKey: "transfer-key",
// 		});

// 		return transfer;
// 	}

// 	async withdraw(wallet: Wallet, amount: number) {
// 		const transfer = await this.withdrawUC.execute(wallet, amount);

// 		await this.eventPublisher.publish("wallet.main.withdraw.pending", {
// 			walletKey: wallet.walletKey,
// 			amount,
// 			transferKey: "transfer.transferKey",
// 		});

// 		return transfer;
// 	}

// 	async internalTransfer(source: Wallet, dest: Wallet, amount: number) {
// 		const transfer = await this.internalUC.execute(source, dest, amount);
// 		await this.eventPublisher.publish("wallet.main.transfer.out", {
// 			sourceWalletKey: source.walletKey,
// 			destWalletKey: dest.walletKey,
// 			amount,
// 			transferKey: "transfer.transferKey",
// 		});
// 		return transfer;
// 	}
// }
