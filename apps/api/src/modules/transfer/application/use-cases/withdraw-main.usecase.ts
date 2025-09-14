import { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletTransferService } from "../services/main-wallet-transfer.service";

export class WithdrawMainUseCase {
    constructor(private service: MainWalletTransferService) {}
  
    async execute(wallet: Wallet, amount: number) {
      return this.service.withdraw(wallet, amount);
    }
  }