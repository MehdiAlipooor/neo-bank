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
const confirm_deposit_use_case_1 = require("../../application/use-cases/confirm-deposit.use-case");
const wallet_adaptor_1 = require("../adaptors/wallet.adaptor");
const rabbitMQ_consumer_1 = require("../message-broker/rabbitMQ-consumer");
const ledger_repository_1 = require("../repositories/ledger.repository");
function queryBank(transferId) {
    return __awaiter(this, void 0, void 0, function* () {
        return "success";
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const consumer = new rabbitMQ_consumer_1.RabbitMqConsumer();
    yield consumer.consume((msg, ack, retry) => __awaiter(void 0, void 0, void 0, function* () {
        const { transferId } = msg;
        const ledgerRepo = new ledger_repository_1.LedgerRepository();
        const walletAdapter = new wallet_adaptor_1.WalletAdaptor();
        const confirm = new confirm_deposit_use_case_1.ConfirmDeposit(ledgerRepo, walletAdapter);
        try {
            const bank = yield queryBank(transferId);
            switch (bank) {
                case "success":
                    yield confirm.execute(transferId, true);
                    ack();
                    console.log(`Deposit completed (transferId=${transferId})`);
                case "failed":
                    yield confirm.execute(transferId, false);
                    ack();
                    console.log(`Deposit failed (transferId=${transferId})`);
                default:
                    console.log("unknwos");
                    retry();
                // console.error("Worker error:", err);
                // retry();
            }
        }
        catch (err) {
            console.error("Worker error:", err);
            retry();
        }
    }));
}))();
