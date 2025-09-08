import { randomUUID } from "node:crypto";
import type { CreateWalletDTO } from "../dto/CreateWalletDTO";
import type { IWalletRepository } from "../ports/wallet-repository.port";
import { WalletToDtoMapper } from "../mappers/WalletMapper";
import { Wallet } from "../../domain/entities/wallet";
import { Money } from "../../domain/value-objects/Money";

export class CreateWallet {
	constructor(private readonly walletRepo: IWalletRepository) {}

	async execute(dto: CreateWalletDTO) {
		const wallet = new Wallet(randomUUID(), dto.userId, 0, new Money(0));
		const created = await this.walletRepo.create(wallet);
		return WalletToDtoMapper(created);
	}
}
