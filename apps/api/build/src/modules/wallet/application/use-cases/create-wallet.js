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
exports.CreateWallet = void 0;
const node_crypto_1 = require("node:crypto");
const WalletMapper_1 = require("../mappers/WalletMapper");
const wallet_1 = require("../../domain/entities/wallet");
const Money_1 = require("../../domain/value-objects/Money");
class CreateWallet {
    constructor(walletRepo) {
        this.walletRepo = walletRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new wallet_1.Wallet((0, node_crypto_1.randomUUID)(), dto.userId, 0, new Money_1.Money(0));
            const created = yield this.walletRepo.create(wallet);
            return (0, WalletMapper_1.WalletToDtoMapper)(created);
        });
    }
}
exports.CreateWallet = CreateWallet;
