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
exports.LegacyWithdrawFunds = void 0;
const Money_1 = require("../../domain/value-objects/Money");
const WalletMapper_1 = require("../mappers/WalletMapper");
class LegacyWithdrawFunds {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.walletRepo.findById(dto.walletId);
            if (!wallet)
                throw new Error("Wallet not found");
            wallet.withdraw(new Money_1.Money(dto.amount));
            const updated = yield this.walletRepo.update(wallet);
            return (0, WalletMapper_1.WalletToDtoMapper)(updated);
        });
    }
}
exports.LegacyWithdrawFunds = LegacyWithdrawFunds;
