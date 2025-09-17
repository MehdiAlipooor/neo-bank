import { randomUUID } from "node:crypto";
import { MainWallet } from "../../domain/entities/main-wallet.entity";
import {
    WalletFactory,
    WalletType,
} from "../../domain/factories/create-wallet.factory";
import { Money } from "../../domain/value-objects/money.value-object";
import { CreateWalletDTO } from "../dtos/create-wallet.dto";
import { WalletToDtoMapper } from "../mappers/wallet-to-dto.mapper";
import { WalletRepositoryPort } from "../ports/wallet-repository.port";

export class CreateWallet {
	constructor(private readonly walletRepo: WalletRepositoryPort) {}

	async execute(dto: CreateWalletDTO) {
		
        const exitsts = await this.walletRepo.findById(dto.walletKey);
        if(exitsts){
            throw new Error('wallet_exists_error')
        }
        
        const walletData = WalletFactory.create(
			dto.accountId,
			WalletType.MAIN,
			dto.walletName,
		);

        const mainWallet = new MainWallet(
            randomUUID(),
            dto.accountId,
            // dto.userId,
            new Money(0),
            new Money(0),
        )

        await this.walletRepo.create(mainWallet)
        return WalletToDtoMapper(mainWallet)
	}
}
