import { MainWallet } from "../entities/main-wallet.entity";
import { MainWalletPolicy } from "../policies/main-wallet.policy";
import { Money } from "../value-objects/money.value-object";

export enum WalletType {
	MAIN = "MAIN",
	SAVING_POT = "SAVING_POT",
	CHEQUE = "CHEQUE",
}

// biome-ignore lint/complexity/noStaticOnlyClass: <Its needed here>
export class WalletFactory {
	static create({
		accountId,
		walletKey,
		type,
		balance,
		available,
	}: {
		accountId: string;
		walletKey: string;
		type: WalletType;
		balance: number;
		available: number;
	}) {
		const mBalance = new Money(balance);
		const mAvailable = new Money(available);

		if (type === WalletType.MAIN) {
			return new MainWallet(
				walletKey ?? `wal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
				accountId,
				mBalance,
				mAvailable,
				new MainWalletPolicy(),
			);
		}

		/**
		 * @TODO implement diffrent wallets
		 */

		// if(type === WalletType.SAVING_POT){
		// 	return new
		// }

		// return {
		//   id: randomUUID(),
		//   walletKey: `wal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
		//   accountId,
		//   walletType: type,
		//   name: name ?? type,
		//   balance: 0,
		//   available: 0,
		// };
	}
}
