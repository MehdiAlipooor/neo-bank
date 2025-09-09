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
exports.ReleaseHoldUseCase = void 0;
class ReleaseHoldUseCase {
    constructor(transferRepo, holdRepo) {
        this.transferRepo = transferRepo;
        this.holdRepo = holdRepo;
    }
    execute(holdId, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const hold = yield this.holdRepo.findById(holdId, tx);
            if (!hold) {
                throw new Error("hold_not_found");
            }
            hold.release();
            const wallet = yield this.transferRepo.findById(hold.walletId, tx);
            if (!wallet) {
                throw new Error("wallet_not_found");
            }
            wallet.releaseHold(hold.amount);
            yield this.holdRepo.update(hold, tx);
            yield this.transferRepo.save(wallet);
            return hold;
            // const hold
            // wallet.releaseHold()
        });
    }
}
exports.ReleaseHoldUseCase = ReleaseHoldUseCase;
