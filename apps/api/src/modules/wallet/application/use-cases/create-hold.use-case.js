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
exports.CreateHoldUseCase = void 0;
const node_crypto_1 = require("node:crypto");
const hold_entity_1 = require("../../domain/entities/hold.entity");
const Money_1 = require("../../domain/value-objects/Money");
class CreateHoldUseCase {
    constructor(walletRepo, holdRepo) {
        this.walletRepo = walletRepo;
        this.holdRepo = holdRepo;
    }
    execute(walletId, amountNumber, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield this.walletRepo.findById(walletId, tx);
            if (!wallet) {
                throw new Error("wallet_not_found");
            }
            const amount = new Money_1.Money(amountNumber);
            wallet.applyHold(amount);
            // Save wallet and hold in same transaction (tx passed down by caller)
            yield this.walletRepo.save(wallet, tx);
            // Create new hold
            const hold = new hold_entity_1.Hold((0, node_crypto_1.randomUUID)(), walletId, amount);
            return yield this.holdRepo.create(hold);
        });
    }
}
exports.CreateHoldUseCase = CreateHoldUseCase;
