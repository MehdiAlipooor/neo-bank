// src/modules/wallet/domain/MainWallet.ts

import { MainWalletPolicy } from "../policies/main-wallet.policy";
import type { WalletPolicy } from "../policies/wallet.policy";
import { Money } from "../value-objects/money.value-object";
import { Wallet } from "./wallet";

export class MainWallet extends Wallet {
  constructor(
    walletKey: string,
    accountId: string,
    balance: Money,
    available: Money,
    policy?: WalletPolicy
  ) {
    super(
      walletKey,
      accountId,
      "MAIN",
      balance,
      available,
      policy ?? new MainWalletPolicy()
    );
  }

  protected setPolicy(): void {
    this.policy = new MainWalletPolicy();
  }

  /** Deposit logic specific to MAIN wallet */
  async deposit(amount: number, meta?: any): Promise<void> {
    if (amount <= 0) throw new Error("Deposit amount must be positive");

    this.balance = this.balance.add(new Money(amount));
    this.available = this.available.add(new Money(amount));

    this.addDomainEvent({
      type: "MainWalletDeposited",
      walletKey: this.walletKey,
      amount,
      meta,
    });
  }

  /** Withdraw with main-wallet rules */
  async withdraw(amount: number, meta?: any): Promise<void> {
    if (amount <= 0) throw new Error("Withdraw amount must be positive");

    // Suppose we require a minimum reserve of 10,000
    const MIN_RESERVE = 10_000;
    if (amount > this.available.value - MIN_RESERVE) {
      throw new Error(`Must keep minimum reserve of ${MIN_RESERVE}`);
    }

    this.balance = this.balance.subtract(new Money(amount));
    this.available = this.available.subtract(new Money(amount));

    this.addDomainEvent({
      type: "MainWalletWithdrawn",
      walletKey: this.walletKey,
      amount,
      meta,
    });
  }

  /** Internal transfer to another wallet */
  async transfer(to: Wallet, amount: number, meta?: any): Promise<void> {
    if (amount <= 0) throw new Error("Transfer amount must be positive");
    if (amount > this.available.value) throw new Error("Insufficient funds");

    // Debit this wallet
    this.balance = this.balance.subtract(new Money(amount));
    this.available = this.available.subtract(new Money(amount));

    // Credit destination wallet
    await to.deposit(amount, { ...meta, from: this.walletKey });

    this.addDomainEvent({
      type: "MainWalletTransferred",
      sourceWalletKey: this.walletKey,
      destWalletKey: to.walletKey,
      amount,
      meta,
    });
  }

  getWallet() {
    return this;
  }
}
