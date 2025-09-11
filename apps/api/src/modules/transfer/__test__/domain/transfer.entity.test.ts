import { Transfer } from "../../domain/entities/transfer.entity";
import { TransferStatus } from "../../domain/enums/transfer-objects.enum";
import { TransferTypes } from "../../domain/enums/transfer.enum";

const mockTransfer = {
	id: "sample_id",
	type: TransferTypes.DEPOSIT,
	amount: 1000,
	sourceWalletId: "sample_source_wallet_id",
};

describe("Transfer Entity Domain", () => {
	it("should create transfer object exactly similar to input data", () => {
		const transfer = new Transfer(
			mockTransfer.id,
			mockTransfer.type,
			mockTransfer.amount,
			mockTransfer.sourceWalletId,
		);

		expect(transfer.id).toBe(mockTransfer.id);
		expect(transfer.type).toBe(mockTransfer.type);
		expect(transfer.amount).toBe(mockTransfer.amount);
		expect(transfer.sourceWalletId).toBe(mockTransfer.sourceWalletId);
		expect(transfer.destIdentifier).toBeUndefined();
		expect(transfer.idempotencyKey).toBeUndefined();
		expect(transfer.metadata).toBeUndefined();
	});

	it("should create transfer object with default status CREATED", () => {
		const transfer = new Transfer(
			mockTransfer.id,
			mockTransfer.type,
			mockTransfer.amount,
			mockTransfer.sourceWalletId,
		);

		expect(transfer.status).toBe(TransferStatus.CREATED);
	});

	it("should mark transfer as Failed", () => {
		const transfer = new Transfer(
			mockTransfer.id,
			mockTransfer.type,
			mockTransfer.amount,
			mockTransfer.sourceWalletId,
		);

		transfer.markCompleted();
		expect(transfer.status).toBe(TransferStatus.COMPLETED);
	});

	it("should mark transfer as FAILED", () => {
		const transfer = new Transfer(
			mockTransfer.id,
			mockTransfer.type,
			mockTransfer.amount,
			mockTransfer.sourceWalletId,
		);

		transfer.markFailed();
		expect(transfer.status).toBe(TransferStatus.FAILED);
	});

	it("should mark transfer as RESERVED", () => {
		const transfer = new Transfer(
			mockTransfer.id,
			mockTransfer.type,
			mockTransfer.amount,
			mockTransfer.sourceWalletId,
		);

		transfer.markReserved();
		expect(transfer.status).toBe(TransferStatus.RESERVED);
	});
});
