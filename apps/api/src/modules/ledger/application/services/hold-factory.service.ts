import { ConcreteHold } from "../../domain/entities/concrete-hold.entity";

// biome-ignore lint/complexity/noStaticOnlyClass: <We need this here>
export class HoldFactory {
	static createHold(walletKey: string, amount: bigint) {
		return new ConcreteHold(
			crypto.randomUUID(),
			`hold-${Date.now()}`,
			walletKey,
			amount,
		);
	}
}
