import { TransferStatus } from "@prisma/client";

export class Transfer {
	constructor(
		public id: string,
		public sourceWalletKey: string,
		public type: "DEPOSIT" | "WITHDRAW" | "INTERNAL",
		public amount: bigint,
		public status: TransferStatus = "CREATED",
		public destinationWalletKey?: string,
		public metadata?: any,
	) {}
}
