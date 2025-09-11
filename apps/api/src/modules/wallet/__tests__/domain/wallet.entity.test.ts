import { HoldStatus } from "../../../transfer/domain/value-objects/hold-status.vo";
import { Wallet } from "../../domain/entities/wallet";
import { Money } from "../../domain/value-objects/Money";

describe("Wallet Domain", () => {
	let wallet: Wallet;

	beforeEach(() => {
		wallet = new Wallet("wallet_1", "user_1", 1000, new Money(1000));
	});

	it("should initialize wallet correctly", () => {
		expect(wallet.id).toBe("wallet_1");
		expect(wallet.userId).toBe("user_1");
		expect(wallet.balance.value).toBe(1000);
		expect(wallet.available.value).toBe(1000);
		expect(wallet.holds).toEqual([]);
		expect(wallet.isRemoved).toBe(false);
	});

	it("should correctly check if can place hold", () => {
		const amount = new Money(500);
		expect(wallet.canPlacehold(amount)).toBe(true);
		expect(wallet.canPlacehold(new Money(1500))).toBe(false);
	});

	it("should calculate available balance considering holds", () => {
		wallet.createHold(new Money(400), "transfer_1");
		expect(wallet.getAvailableBalance().value).toBe(600);

		wallet.createHold(new Money(100), "transfer_2");
		expect(wallet.getAvailableBalance().value).toBe(500);
	});

	it("should create hold and reduce available balance", () => {
		const hold = wallet.createHold(new Money(200), "transfer_1");

		expect(wallet.holds.length).toBe(1);
		expect(wallet.holds[0].id).toBe(hold.id);
		expect(wallet.holds[0].status).toBe(HoldStatus.ACTIVE);
		expect(wallet.available.value).toBe(800);
	});

	it("should throw error if creating hold exceeds available balance", () => {
		expect(() => wallet.createHold(new Money(1500), "transfer_1")).toThrow(
			"insufficient_available_balance_for_hold",
		);
	});

	it("should release a hold", () => {
		const hold = wallet.createHold(new Money(100), "transfer_1");
		wallet.releaseHold(hold.id);

		expect(wallet.holds[0].status).toBe(HoldStatus.RELEASED);
	});

	it("should deposit money correctly", () => {
		wallet.deposit(new Money(500));
		expect(wallet.balance.value).toBe(1500);
	});

	it("should throw error if deposit amount is zero or negative", () => {
		expect(() => wallet.deposit(new Money(0))).toThrow("insuficient_amount");
		expect(() => wallet.deposit(new Money(-100))).toThrow("insuficient_amount");
	});

	it("should withdraw money correctly", () => {
		wallet.withdraw(new Money(400));
		expect(wallet.balance.value).toBe(600);
	});

	it("should throw error if withdraw amount is zero or negative", () => {
		expect(() => wallet.withdraw(new Money(0))).toThrow(
			"Withdraw must be positive",
		);
		expect(() => wallet.withdraw(new Money(-100))).toThrow(
			"Withdraw must be positive",
		);
	});

	// -------------------- Balance Getter --------------------
	it("should return current balance", () => {
		expect(wallet.getBalance()).toBe(1000);
		wallet.deposit(new Money(200));
		expect(wallet.getBalance()).toBe(1200);
	});
});
