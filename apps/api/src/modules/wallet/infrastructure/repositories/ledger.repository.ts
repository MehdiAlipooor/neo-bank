import type { PrismaClient } from "@prisma/client";
import type { ILedgerRepository } from "../../application/ports/ledger.repository.port";
import {
	LedgerEntry,
	LedgerTransactionType,
} from "../../../transfer/domain/entities/ledger-entry.entity";

export class LedgerRepository implements ILedgerRepository {
	constructor(private prisma: PrismaClient) {}

	async createEntry(entry: LedgerEntry, tx?: any): Promise<void> {
		const client = tx ?? this.prisma;
		await client.ledgerEntry.create({
			data: {
				id: entry.id,
				txId: entry.reference ?? "", // reference used as txId mapping; adjust per your model
				walletId: entry.walletId,
				account: entry.account,
				amount: entry.amount,
				metadata: null,
			},
		});
	}

	async createTransactionEntries(
		txId: string,
		entries: LedgerEntry[],
		tx?: any,
	): Promise<void> {
		const client = tx ?? this.prisma;

		// create LedgerTransaction and associated entries atomically
		await client.ledgerTransaction.create({
			data: {
				id: txId,
				transferId: null,
				type: LedgerTransactionType.TRANSFER,
				ledgerEntries: {
					create: entries.map((e) => ({
						id: e.id,
						walletId: e.walletId,
						account: e.account,
						amount: e.amount,
						metadata: null,
					})),
				},
			},
		});
	}
}
