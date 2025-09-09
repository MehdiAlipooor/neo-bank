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
exports.WalletRepository = void 0;
const client_1 = require("@prisma/client");
const wallet_1 = require("../../domain/entities/wallet");
const Money_1 = require("../../domain/value-objects/Money");
const prisma = new client_1.PrismaClient();
class WalletRepository {
    create(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(wallet);
            const record = yield prisma.wallet.create({
                data: {
                    id: wallet.id,
                    userId: wallet.userId,
                    balance: wallet.getBalance(),
                },
            });
            return new wallet_1.Wallet(record.id, record.userId, Number(record.balance), new Money_1.Money(0));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield prisma.wallet.findUnique({ where: { id } });
            if (!record) {
                return null;
            }
            return new wallet_1.Wallet(record.id, record.userId, Number(record.balance), record.available);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield prisma.wallet.findUnique({ where: { userId } });
            if (!record) {
                return null;
            }
            return new wallet_1.Wallet(record.id, record.userId, Number(record.balance), record.available);
        });
    }
    update(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield prisma.wallet.update({
                where: { id: wallet.id },
                data: { balance: wallet.getBalance() },
            });
            return new wallet_1.Wallet(record.id, record.userId, Number(record.balance), record.available);
        });
    }
}
exports.WalletRepository = WalletRepository;
