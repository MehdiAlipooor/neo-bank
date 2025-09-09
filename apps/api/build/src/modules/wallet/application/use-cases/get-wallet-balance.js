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
exports.GetWalletBalance = void 0;
class GetWalletBalance {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }
    execute(walletId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.walletRepo.findById(walletId);
            if (!wallet)
                throw new Error("Wallet not found");
            return wallet.getBalance();
        });
    }
}
exports.GetWalletBalance = GetWalletBalance;
