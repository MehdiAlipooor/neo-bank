import { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletTransferService } from "../services/main-wallet-transfer.service";

export class InternalTransferMainUseCase {
    constructor(private service: MainWalletTransferService) {}
  
    async execute(source: Wallet, dest: Wallet, amount: number) {
      return this.service.internalTransfer(source, dest, amount);
    }
  }
  