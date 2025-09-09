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
exports.WalletController = void 0;
const wallet_repository_1 = require("../infrastructure/repositories/wallet.repository");
const create_wallet_1 = require("../application/use-cases/create-wallet");
const get_wallet_balance_1 = require("../application/use-cases/get-wallet-balance");
const legacy_deposit_found_1 = require("../application/use-cases/legacy-deposit-found");
const legacy_withdraw_fund_1 = require("../application/use-cases/legacy-withdraw-fund");
const walletRepo = new wallet_repository_1.WalletRepository();
class WalletController {
    createWallet(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const useCase = new create_wallet_1.CreateWallet(walletRepo);
            const result = yield useCase.execute({ userId });
            reply.send(result);
        });
    }
    depositFunds(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { walletId, amount } = req.body;
            const useCase = new legacy_deposit_found_1.LegacyDepositFound(walletRepo);
            const result = yield useCase.execute({ walletId, amount });
            reply.send(result);
        });
    }
    withdrawFunds(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { walletId, amount } = req.body;
            const useCase = new legacy_withdraw_fund_1.LegacyWithdrawFunds(walletRepo);
            const result = yield useCase.execute({ walletId, amount });
            reply.send(result);
        });
    }
    getBalance(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const useCase = new get_wallet_balance_1.GetWalletBalance(walletRepo);
            const balance = yield useCase.execute(id);
            reply.send({ walletId: id, balance });
        });
    }
}
exports.WalletController = WalletController;
