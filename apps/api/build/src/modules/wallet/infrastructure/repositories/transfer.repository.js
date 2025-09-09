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
exports.TransferRepository = void 0;
const wallet_1 = require("../../domain/entities/wallet");
const Money_1 = require("../../domain/value-objects/Money");
class TransferRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    save(wallet, _tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return wallet;
        });
    }
    findById(walletId, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            const wallet = yield client.wallet.findUnique({ where: { id: walletId } });
            if (!wallet) {
                return null;
            }
            // compute balance and available from ledger + holds in DB
            // For simplicity assume wallet table doesn't store cached balances; we compute using queries
            const ledgerRows = yield client.$queryRaw `SELECT COALESCE(SUM(amount),0) AS sum FROM "LedgerEntry" WHERE "walletId" = ${walletId}`;
            const ledgerSum = parseFloat(ledgerRows[0].sum || "0");
            const holdsAgg = yield client.hold.aggregate({
                _sum: { amount: true },
                where: { walletId, status: "ACTIVE" },
            });
            const holds = parseFloat(((_b = (_a = holdsAgg._sum) === null || _a === void 0 ? void 0 : _a.amount) === null || _b === void 0 ? void 0 : _b.toString()) || "0");
            const balance = ledgerSum;
            const available = new Money_1.Money(ledgerSum - holds);
            return new wallet_1.Wallet(wallet.id, "", balance, available);
        });
    }
}
exports.TransferRepository = TransferRepository;
