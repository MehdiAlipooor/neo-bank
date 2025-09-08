import { Money } from "../../domain/value-objects/Money";
import type { TransactionDTO } from "../dto/TransactionDTO";
import { WalletToDtoMapper } from "../mappers/WalletMapper";
import type { IWalletRepository } from "../ports/wallet-repository.port";

export class LegacyDepositFound {
	constructor(private readonly walletRepo: IWalletRepository) {}

	async execute(dto: TransactionDTO) {
		const wallet = await this.walletRepo.findById(dto.walletId);
		if (!wallet) throw new Error("Wallet not found");

		wallet.deposit(new Money(dto.amount));
		const updated = await this.walletRepo.update(wallet);
		return WalletToDtoMapper(updated);
	}
}
