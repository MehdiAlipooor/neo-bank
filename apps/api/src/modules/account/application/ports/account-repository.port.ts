import type { Account } from "../../domain/entities/account.account";
import type { CreateAccountDto } from "../dtos/create-account.dto";

export interface AccountRepositoryPort {
	existsByUserId(accountId: string): Promise<boolean>;
	create(account: Account): Promise<CreateAccountDto>;
}
