"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitHoldUseCase = void 0;
const node_crypto_1 = require("node:crypto");
const ledger_entry_entity_1 = require("../../domain/entities/ledger-entry.entity");
class CommitHoldUseCase {
    constructor(transferRepo, holdRepo, ledgerRepo) {
        this.transferRepo = transferRepo;
        this.holdRepo = holdRepo;
        this.ledgerRepo = ledgerRepo;
    }
    execute(holdId, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const hold = yield this.holdRepo.findById(holdId, tx);
            if (!hold) {
                throw new Error("hold_not_found");
            }
            hold.consume();
            const wallet = yield this.transferRepo.findById(hold.walletId);
            if (!wallet) {
                throw new Error("wallet_not_found");
            }
            // substract balance from wallet amount
            wallet.balance = wallet.balance.subtract(hold.amount);
            // create ledger entry (debit wallet, credit settlement account)
            const debit = new ledger_entry_entity_1.LedgerEntry((0, node_crypto_1.randomUUID)(), wallet.id, hold.amount, "WALLET", hold.id);
            const credit = new ledger_entry_entity_1.LedgerEntry((0, node_crypto_1.randomUUID)(), null, hold.amount, "SETTLEMENT", hold.id);
            yield this.holdRepo.update(hold, tx);
            yield this.transferRepo.save(wallet, tx);
            yield this.ledgerRepo.createTransactionEntries((0, node_crypto_1.randomUUID)(), [debit, credit], tx);
            return hold;
        });
    }
}
exports.CommitHoldUseCase = CommitHoldUseCase;
