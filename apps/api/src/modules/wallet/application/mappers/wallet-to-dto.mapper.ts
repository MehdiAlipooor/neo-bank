import type { MainWallet } from "../../domain/entities/main-wallet.entity";

export function WalletToDtoMapper(wallet: MainWallet) {
	return {
		id: wallet.walletKey,
		userId: wallet.accountId,

		/**
		 * @description Not sure about it
		 * it can be wallet.balance or wallet.available
		 */
		balance: wallet.available,
	};
}
