import type { MainWallet } from "../../../wallet/domain/entities/main-wallet.entity";
import type { Transfer } from "../../domain/entites/transfer.entity";
import { DepositSettlementWorkflow } from "./deposit-settlement.workflow";

export class MainWalletDepositSettlementWorkflow extends DepositSettlementWorkflow<MainWallet> {
	async execute({
		transfer,
		wallet,
	}: {
		transfer: Transfer;
		wallet: MainWallet;
	}) {
		await super.execute({ transfer, wallet });
	}
}
