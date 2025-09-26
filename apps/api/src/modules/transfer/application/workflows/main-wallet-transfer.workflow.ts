import type { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";
import { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletPolicy } from "../../../wallet/domain/policies/main-wallet.policy";
import type { DepositMainUseCase } from "../use-cases/initi-deposit-main.use-case";

export class MainWalletDepositWorkflow {
  constructor(
    private depositUC: DepositMainUseCase,
    private eventPublisher: RabbitMQPublisher
  ) {}

  async deposit(wallet: Wallet, amount: number) {
    const transfer = await this.depositUC.execute(
      new MainWallet(
        wallet.walletKey,
        wallet.accountId,
        wallet.balance,
        wallet.available,
        new MainWalletPolicy()
      ),
      amount
    );

    await this.eventPublisher.publish<any>("wallet.main.deposit.created", {
      walletKey: wallet.walletKey,
      amount,
      transferKey: "transfer-key",
    });

    return transfer;
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
