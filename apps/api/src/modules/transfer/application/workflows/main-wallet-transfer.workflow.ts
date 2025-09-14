import { Wallet } from "../../../wallet/domain/entities/Wallet";
import { DepositMainUseCase } from "../use-cases/deposit-main.usecase";
import { InternalTransferMainUseCase } from "../use-cases/internal-transfer-main.usecase";
import { WithdrawMainUseCase } from "../use-cases/withdraw-main.usecase";

export class MainWalletTransferWorkflow {
  constructor(
    private depositUC: DepositMainUseCase,
    private withdrawUC: WithdrawMainUseCase,
    private internalUC: InternalTransferMainUseCase,
    // private publisher: Publisher
  ) {}

  async deposit(wallet: Wallet, amount: number) {
    const transfer = await this.depositUC.execute(wallet, amount);
    // await this.publisher.publish("transfer.created", {
    //   type: "DEPOSIT",
    //   walletKey: wallet.walletKey,
    //   amount,
    // });
    return transfer;
  }

  async withdraw(wallet: Wallet, amount: number) {
    const transfer = await this.withdrawUC.execute(wallet, amount);
    // await this.publisher.publish("transfer.created", {
    //   type: "WITHDRAW",
    //   walletKey: wallet.walletKey,
    //   amount,
    // });
    return transfer;
  }

  async internalTransfer(source: Wallet, dest: Wallet, amount: number) {
    const transfer = await this.internalUC.execute(source, dest, amount);
    // await this.publisher.publish("transfer.created", {
    //   type: "INTERNAL",
    //   sourceWalletKey: source.walletKey,
    //   destWalletKey: dest.walletKey,
    //   amount,
    // });
    return transfer;
  }
}
