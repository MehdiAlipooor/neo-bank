import { randomUUID } from "node:crypto";

export enum WalletType {
	MAIN = "MAIN",
	SAVING_POT = "SAVING_POT",
	CHEQUE = "CHEQUE",
}

// biome-ignore lint/complexity/noStaticOnlyClass: <Its needed here>
export class WalletFactory {
	static create(accountId: string, type: WalletType, name?: string) {
		return {
			id: randomUUID(),
			walletKey: `wal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
			accountId,
			walletType: type,
			name: name ?? type,
			balance: 0,
			available: 0,
		};
	}
}
