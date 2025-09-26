import type { WalletFecadePort } from "../../../wallet/application/ports/wallet-fecade.port";
import type { TransferRepositoryPort } from "../ports/transfer-repository.port";

export class MainWalletDepositSettlementWorkflow {
  constructor(
    private readonly transferRepo: TransferRepositoryPort,
    private readonly walletFecade: WalletFecadePort
  ) {}

  async execute({ walletKey, amount, transferKey }: any) {}
}
