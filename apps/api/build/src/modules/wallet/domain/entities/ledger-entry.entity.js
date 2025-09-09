"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerEntry = void 0;
class LedgerEntry {
    constructor(id, walletId, amount, account, reference, createdAt = new Date()) {
        this.id = id;
        this.walletId = walletId;
        this.amount = amount;
        this.account = account;
        this.reference = reference;
        this.createdAt = createdAt;
    }
}
exports.LedgerEntry = LedgerEntry;
