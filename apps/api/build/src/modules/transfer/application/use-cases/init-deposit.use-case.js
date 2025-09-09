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
exports.InitDeposit = void 0;
const Money_1 = require("../../../wallet/domain/value-objects/Money");
class InitDeposit {
    constructor(ledgerRepo, qeuePublisher, walletAdaptor) {
        this.ledgerRepo = ledgerRepo;
        this.qeuePublisher = qeuePublisher;
        this.walletAdaptor = walletAdaptor;
    }
    execute(walletId, amountNumber, idempotencyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("STEP_ONE");
            const currentWallet = yield this.walletAdaptor.findById(walletId);
            if (!currentWallet) {
                throw new Error("wallet_not_found");
            }
            console.log("STEP_TWO");
            const existingTransfers = yield this.ledgerRepo.findTransferByIdempotencyKey(idempotencyKey);
            if (existingTransfers) {
                return {
                    transferId: existingTransfers.id,
                    message: "Deposit already initialized (idempotent)",
                };
            }
            console.log("STEP_THREE");
            const id = crypto.randomUUID();
            const amount = new Money_1.Money(amountNumber);
            const txId = crypto.randomUUID();
            yield this.ledgerRepo.createDepositTransaction({
                id,
                walletId,
                amount,
                idempotencyKey,
                txId,
            });
            // await this.qeuePublisher.publishDepositVerify({ transferId: id });
            // const pub = new RabbitMqPublisher();
            yield this.qeuePublisher.publishDepositVerify({ transferId: id });
            console.log("STEP_FIVE");
            return { transferId: id, idempotencyKey, message: "Deposit initialized" };
        });
    }
}
exports.InitDeposit = InitDeposit;
