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
exports.WalletAdaptor = void 0;
const client_1 = require("@prisma/client");
const wallet_toDto_mapper_1 = require("../../application/mappers/wallet-toDto.mapper");
const prisma = new client_1.PrismaClient();
class WalletAdaptor {
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield prisma.wallet.findUnique({ where: { userId } });
            if (!record) {
                return null;
            }
            return (0, wallet_toDto_mapper_1.walletToDto)(record);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield prisma.wallet.findUnique({ where: { id } });
            if (!record) {
                return null;
            }
            return (0, wallet_toDto_mapper_1.walletToDto)(record);
        });
    }
    credit(walletId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.wallet.update({
                where: { id: walletId },
                data: { balance: { increment: amount.value } },
            });
        });
    }
    ebit(walletId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.wallet.update({
                where: { id: walletId },
                data: { balance: { decrement: amount.value } },
            });
        });
    }
}
exports.WalletAdaptor = WalletAdaptor;
