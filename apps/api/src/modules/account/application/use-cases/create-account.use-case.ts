import { randomUUID } from "node:crypto";
import { Account } from "../../domain/entities/account.account";
import { AccountRepository } from "../../infrastructure/repositories/account.repository";
import type { AccountRepositoryPort } from "../ports/account-repository.port";

export class CreateAccount {
	repo: AccountRepositoryPort;
	constructor() {
		this.repo = new AccountRepository();
	}

	async execute(userId: string, type = "PERSONAL") {
		const exists = await this.repo.existsByUserId(userId);
		if (exists) {
			throw new Error("Account already exists");
		}

		const accountParams = new Account(randomUUID(), userId, type);

		const createAccountAction = await this.repo.create(accountParams);

		return createAccountAction;
	}
}
