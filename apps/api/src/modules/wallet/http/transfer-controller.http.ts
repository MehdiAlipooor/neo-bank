import prisma from "../../../../lib/db/prisma";
import { CommitHoldUseCase } from "../application/use-cases/commit-hold.use-case";
import { CreateHoldUseCase } from "../application/use-cases/create-hold.use-case";
import { ReleaseHoldUseCase } from "../application/use-cases/release-hold.use-case";
import { HoldRepository } from "../infrastructure/repositories/hold.repository";
import { LedgerRepository } from "../infrastructure/repositories/ledger.repository";
import { TransferRepository } from "../infrastructure/repositories/transfer.repository";

const walletRepo = new TransferRepository(prisma);
const holdRepo = new HoldRepository(prisma);
const ledgerRepo = new LedgerRepository(prisma);

// Example express-style handlers (assume express app)
export const createHoldHandler = async (req: any, res: any) => {
	const { walletId, amount } = req.body;
	try {
		const usecase = new CreateHoldUseCase(walletRepo, holdRepo);

		// run inside transaction to lock wallet row and persist hold atomically
		const result = await prisma.$transaction(async (tx: any) => {
			// optional: lock wallet row with raw SELECT FOR UPDATE
			await tx.$queryRaw`SELECT id FROM "Wallet" WHERE id = ${walletId} FOR UPDATE`;
			return usecase.execute(walletId, amount, tx);
		});

		res.json(result);
	} catch (err) {
		res.status(400).json({ error: String(err) });
	}
};

export const releaseHoldHandler = async (req: any, res: any) => {
	const { holdId } = req.body;
	try {
		const usecase = new ReleaseHoldUseCase(walletRepo, holdRepo);
		const result = await prisma.$transaction(async (tx: any) =>
			usecase.execute(holdId, tx),
		);
		res.json(result);
	} catch (err) {
		res.status(400).json({ error: String(err) });
	}
};

export const commitHoldHandler = async (req: any, res: any) => {
	const { holdId } = req.body;
	try {
		const usecase = new CommitHoldUseCase(walletRepo, holdRepo, ledgerRepo);
		const result = await prisma.$transaction(async (tx: any) =>
			usecase.execute(holdId, tx),
		);
		res.json(result);
	} catch (err) {
		res.status(400).json({ error: String(err) });
	}
};
