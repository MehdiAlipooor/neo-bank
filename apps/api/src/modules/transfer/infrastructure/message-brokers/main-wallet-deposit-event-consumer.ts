import type { ChannelModel } from "amqplib";
import { RabbitMQEventConsumer } from "../../../../shared/lib/rabbitMq-consumer";
import { LedgerFecad } from "../../../ledger/application/fecades/ledger-fecade";
import { WalletFecade } from "../../../wallet/application/fecads/wallet.fecade";
import { MainWalletDepositSettlementWorkflow } from "../../application/workflows/main-wallet-deposit-settlement.workflow";
import { TransferRepository } from "../repositories/transfer.reository";

const transferRepo = new TransferRepository();
const ledgerFecade = new LedgerFecad();
const walletFecade = new WalletFecade();
const workflow = new MainWalletDepositSettlementWorkflow(
	transferRepo,
	ledgerFecade,
	walletFecade,
);

const mockBankResponse = async () => {
	return await new Promise((resolve) => resolve(true));
};

export class MainWalletEventConsumer extends RabbitMQEventConsumer {
	constructor(connection: ChannelModel) {
		super(connection, "wallet.events", "main-wallet-service");

		this.on(/^wallet\.main\./, async (_routingKey, event) => {
			const bankResponse = await mockBankResponse();
			if (bankResponse) {
				await workflow.execute(event);
			} else {
			}
		});
	}
}
