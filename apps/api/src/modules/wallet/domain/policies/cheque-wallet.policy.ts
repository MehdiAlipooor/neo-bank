import { WalletPolicy } from "./wallet.policy";

export class CheckWalletPolicy implements WalletPolicy {
  canDeposit(fromType: string): boolean {
    // اجازه واریز از Main و دیگر CheckWalletها
    return fromType === "MAIN" || fromType === "CHECK";
  }

  canWithdraw(toType: string): boolean {
    // می‌تواند مستقیم به بانک (External) برداشت کند
    return toType === "EXTERNAL" || toType === "MAIN";
  }

  canTransfer(toType: string): boolean {
    // اجازه انتقال به ولت‌های چک یا Main
    return toType === "MAIN" || toType === "CHECK";
  }

  validate(operation: "deposit" | "withdraw" | "transfer", amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    // می‌توان اینجا محدودیت سقف تراکنش یا تاریخ سررسید را اضافه کرد
  }
}
