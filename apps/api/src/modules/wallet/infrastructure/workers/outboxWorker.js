"use strict";
// import { prisma } from "../prismaClient";
// import { TransferRepository } from "../repositories/transfer.repository";
// import { HoldRepository } from "../repositories/hold.repository";
// import { LedgerRepository } from "../repositories/ledger.repository";
// import { CommitHoldUseCase } from "../../application/use-cases/commit-hold.use-case";
// import { Money } from "../../domain/value-objects/Money";
// const pollInterval = Number(process.env.OUTBOX_POLL_INTERVAL_MS || 2000);
// const walletRepo = new TransferRepository(prisma);
// const holdRepo = new HoldRepository(prisma);
// const ledgerRepo = new LedgerRepository(prisma);
// async function mockBankSend(
// 	transferId: string,
// 	amount: Money,
// 	destIdentifier: string,
// ) {
// 	console.log(destIdentifier, amount);
// 	await new Promise((r) => setTimeout(r, 200));
// 	const success = Math.random() > 0.1;
// 	return { success, externalRef: `bank-${transferId}` };
// }
// async function processEvent(ev: any) {
// 	if (ev.type === "OutboundPaymentRequested") {
// 		const { transferId, holdId, amount, destIdentifier } = ev.payload;
// 		try {
// 			const bankRes = await mockBankSend(
// 				transferId,
// 				amount,
// 				destIdentifier,
// 			);
// 			await prisma.$transaction(async (tx: any) => {
// 				if (bankRes.success) {
// 					// commit hold -> ledger
// 					const commitUC = new CommitHoldUseCase(
// 						walletRepo,
// 						holdRepo,
// 						ledgerRepo,
// 					);
// 					await commitUC.execute(holdId, tx);
// 					await tx.transfer.update({
// 						where: { id: transferId },
// 						data: { status: "SETTLED", externalRef: bankRes.externalRef },
// 					});
// 				} else {
// 					// release hold
// 					const releaseUC =
// 						new // await import("../modules/wallets/application/use-cases/release-hold.usecase"))
// 						(
// 							await import("../../application/use-cases/release-hold.use-case")
// 						).ReleaseHoldUseCase(walletRepo, holdRepo);
// 					// note: imported dynamically for demo; better to import at top
// 					await releaseUC.execute(holdId, tx);
// 					await tx.transfer.update({
// 						where: { id: transferId },
// 						data: { status: "FAILED", externalRef: bankRes.externalRef },
// 					});
// 				}
// 				await tx.outboxEvent.update({
// 					where: { id: ev.id },
// 					data: { processed: true, processedAt: new Date() },
// 				});
// 			});
// 		} catch (err) {
// 			console.error("bank call error", err);
// 			// leave event unprocessed for retry
// 		}
// 	} else {
// 		// mark unknown processed to avoid endless retries
// 		await prisma.outboxEvent.update({
// 			where: { id: ev.id },
// 			data: { processed: true, processedAt: new Date() },
// 		});
// 	}
// }
// export async function pollLoop() {
// 	while (true) {
// 		try {
// 			const events = await prisma.outboxEvent.findMany({
// 				where: { processed: false },
// 				take: 10,
// 				orderBy: { createdAt: "asc" },
// 			});
// 			for (const ev of events) {
// 				// naive concurrency control: try to process each
// 				await processEvent(ev);
// 			}
// 		} catch (err) {
// 			console.error("outbox poll error", err);
// 		}
// 		await new Promise((r) => setTimeout(r, pollInterval));
// 	}
// }
