import { Wallet } from "../../../wallet/domain/entities/wallet";
import { MainWalletTransferService } from "../services/main-wallet-transfer.service";

export class DepositMainUseCase{
    constructor(private service: MainWalletTransferService){}

    async execute(wallet: Wallet, amount: number){
        await this.service.deposit(wallet, amount)
    }
}