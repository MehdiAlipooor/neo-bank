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
exports.LedgerRepository = void 0;
class LedgerRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createEntry(entry, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            yield client.ledgerEntry.create({
                data: {
                    id: entry.id,
                    txId: (_a = entry.reference) !== null && _a !== void 0 ? _a : "", // reference used as txId mapping; adjust per your model
                    walletId: entry.walletId,
                    account: entry.account,
                    amount: entry.amount,
                    metadata: null,
                },
            });
        });
    }
    createTransactionEntries(txId, entries, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            // create LedgerTransaction and associated entries atomically
            yield client.ledgerTransaction.create({
                data: {
                    id: txId,
                    transferId: null,
                    type: "MANUAL",
                    ledgerEntries: {
                        create: entries.map((e) => ({
                            id: e.id,
                            walletId: e.walletId,
                            account: e.account,
                            amount: e.amount,
                            metadata: null,
                        })),
                    },
                },
            });
        });
    }
}
exports.LedgerRepository = LedgerRepository;
