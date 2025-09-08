import { ConfirmDeposit } from "../../application/use-cases/confirm-deposit.use-case";
import { WalletAdaptor } from "../adaptors/wallet.adaptor";
import { RabbitMqConsumer } from "../message-broker/rabbitMQ-consumer";
import { LedgerRepository } from "../repositories/ledger.repository";

async function queryBank(
	transferId: string,
): Promise<"success" | "failed" | "pending"> {
	return "success";
}

(async () => {
	const consumer = new RabbitMqConsumer();

	await consumer.consume(async (msg, ack, retry) => {
		const { transferId } = msg;
		const ledgerRepo = new LedgerRepository();
		const walletAdapter = new WalletAdaptor();
		const confirm = new ConfirmDeposit(ledgerRepo, walletAdapter);

		try {
			const bank = await queryBank(transferId);

			switch (bank) {
				case "success":
					await confirm.execute(transferId, true);
					ack();
					console.log(`Deposit completed (transferId=${transferId})`);

				case "failed":
					await confirm.execute(transferId, false);
					ack();
					console.log(`Deposit failed (transferId=${transferId})`);
				default:
					console.log("unknwos");
					retry();
				// console.error("Worker error:", err);
				// retry();
			}
		} catch (err) {
			console.error("Worker error:", err);
			retry();
		}
	});
})();
