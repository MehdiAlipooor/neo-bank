import { HoldRepository } from "../../../wallet/infrastructure/repositories/hold.repository";
import { ConfirmWithdraw } from "../../application/use-cases/confirm-withdraw.use-case";
import { FailedWithdraw } from "../../application/use-cases/failed-withdraw.use-case copy";
import { WalletAdaptor } from "../adaptors/wallet.adaptor";
import { WithdrawEventConsumer } from "../message-broker/withdraw-event-consumer";
import { LedgerRepository } from "../repositories/ledger.repository";
import { TransferRepository } from "../repositories/transfer.repository";

async function queryBank(): Promise<"success" | "failed" | "pending"> {
	return "success";
}

const walletAdapter = new WalletAdaptor();
const transferRepo = new TransferRepository();
const ledgerRepo = new LedgerRepository();
const holdRepo = new HoldRepository();

const confirmWIthdraw = new ConfirmWithdraw(
	walletAdapter,
	transferRepo,
	ledgerRepo,
	holdRepo,
);

const failedWithdraw = new FailedWithdraw(
	walletAdapter,
	transferRepo,
	holdRepo,
	ledgerRepo,
);

(async () => {
	const consumer = new WithdrawEventConsumer();

	await consumer.consume(async (msg, ack, retry) => {
		const { destAccountId, sourceWalletId, amount, holdId, idempotencyKey } =
			msg;

		try {
			const bank = await queryBank();

			switch (bank) {
				case "success":
					const transferId = await confirmWIthdraw.execute(
						destAccountId,
						sourceWalletId,
						amount,
						holdId,
						idempotencyKey,
					);
					ack();
					console.log(`Deposit completed (transferId=${transferId})`);
					break;

				case "failed":
					const failedTransferId = await failedWithdraw.execute(
						destAccountId,
						sourceWalletId,
						amount,
						holdId,
						idempotencyKey,
					);
					ack();
					console.log(`Deposit failed (transferId=${failedTransferId})`);
					break;
				default:
					retry();
					break;
			}
		} catch (err) {
			console.error("Worker error:", err);
			retry();
		}
	});
})();
