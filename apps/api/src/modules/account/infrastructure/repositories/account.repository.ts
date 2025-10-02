import prisma from "../../../../../lib/db/prisma";
import type { CreateAccountDto } from "../../application/dtos/create-account.dto";
import type { AccountRepositoryPort } from "../../application/ports/account-repository.port";
import type { Account } from "../../domain/entities/account.account";

export class AccountRepository implements AccountRepositoryPort {
	async existsByUserId(userId: string): Promise<boolean> {
		const exists = await prisma.account.findFirst({ where: { userId } });
		return !!exists;
	}

	async create(account: Account): Promise<CreateAccountDto> {
		const record = await prisma.account.create({
			data: {
				accountKey: account.getAccountKey(),
				userId: account.getUserId(),
				type: account.type,
				status: account.status,
			},
		});
		return { accountId: record.id };
	}
}
