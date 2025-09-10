import { HoldStatus } from "../value-objects/hold-status.vo";
import type { Money } from "../../../wallet/domain/value-objects/Money";

export class Hold {
	constructor(
		public id: string,
		public walletId: string,
		public amount: Money,
		public status: HoldStatus = HoldStatus.ACTIVE,
		public createdAt: Date = new Date(),
	) {}

	release() {
		if (this.status !== HoldStatus.ACTIVE) {
			throw new Error("hold_not_active");
		}

		this.status = HoldStatus.RELEASED;
	}

	consume() {
		if (this.status !== HoldStatus.CONSUMED) {
			throw new Error("hold_not_active");
		}

		this.status = HoldStatus.CONSUMED;
	}
}
