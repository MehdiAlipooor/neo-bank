import prisma from "../../../../../lib/db/prisma";
import { RabbitMQPublisher } from "../../../../shared/lib/rabbitMq-publisher";
import type { Wallet } from "../../../wallet/domain/entities/wallet";
import { WalletFactory } from "../../../wallet/domain/factories/create-wallet.factory";
import type { DepositUseCase } from "../use-cases/deposit.use-case";

const publisher = new RabbitMQPublisher();

export class DepositWorkflow<T extends Wallet> {
	constructor(private depositUC: DepositUseCase<T>) {}

	async deposit(wallet: Wallet, idempotencyKey: string, amount: number) {
		const domainWallet = WalletFactory.create({
			accountId: wallet.accountId,
			walletKey: wallet.walletKey,
			type: wallet.walletType,
			balance: wallet.balance.value,
			available: wallet.available.value,
		});

		if (!domainWallet) {
			throw new Error(
				"wallet is required, in apps/api/src/modules/transfer/application/workflows/dposit.workflow.ts",
			);
		}

		return await prisma.$transaction(async (tx) => {
			const transfer = await this.depositUC.execute(
				domainWallet as unknown as T,
				idempotencyKey,
				amount,
				tx,
			);

			const messageObject = {
				transfer,
				wallet,
				amount,
			};

			await publisher.publish<any>(
				`wallet.${wallet.walletType.toLocaleLowerCase()}.deposit.created`,
				messageObject,
			);

			return transfer;
		});
	}
}
