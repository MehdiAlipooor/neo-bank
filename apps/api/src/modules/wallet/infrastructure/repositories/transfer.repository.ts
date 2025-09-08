import type { PrismaClient } from "@prisma/client";
import type { ITransferRepository } from "../../application/ports/transfer-repository.port";
import { Wallet } from "../../domain/entities/wallet";
import { Money } from "../../domain/value-objects/Money";

export class TransferRepository implements ITransferRepository {
	constructor(private prisma: PrismaClient) {}

	async save(wallet: Wallet, _tx?: any): Promise<Wallet> {
		return wallet;
	}

	async findById(walletId: string, tx?: any): Promise<Wallet | null> {
		const client = tx ?? this.prisma;

		const wallet = await client.wallet.findUnique({ where: { id: walletId } });
		if (!wallet) {
			return null;
		}

		// compute balance and available from ledger + holds in DB
		// For simplicity assume wallet table doesn't store cached balances; we compute using queries
		const ledgerRows: { sum: string }[] =
			await client.$queryRaw`SELECT COALESCE(SUM(amount),0) AS sum FROM "LedgerEntry" WHERE "walletId" = ${walletId}`;
		const ledgerSum = parseFloat(ledgerRows[0].sum || "0");

		const holdsAgg = await client.hold.aggregate({
			_sum: { amount: true },
			where: { walletId, status: "ACTIVE" },
		});
		const holds = parseFloat(holdsAgg._sum?.amount?.toString() || "0");

		const balance = ledgerSum;
		const available = new Money(ledgerSum - holds);

		return new Wallet(wallet.id, "", balance, available);
	}
}
