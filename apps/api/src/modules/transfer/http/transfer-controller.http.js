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
exports.TransferController = void 0;
const ledger_repository_1 = require("../infrastructure/repositories/ledger.repository");
const rabbitMQ_publisher_1 = require("../infrastructure/message-broker/rabbitMQ-publisher");
const init_deposit_use_case_1 = require("../application/use-cases/init-deposit.use-case");
const wallet_adaptor_1 = require("../infrastructure/adaptors/wallet.adaptor");
const confirm_deposit_use_case_1 = require("../application/use-cases/confirm-deposit.use-case");
const ledgerRepo = new ledger_repository_1.LedgerRepository();
const publisher = new rabbitMQ_publisher_1.RabbitMqPublisher();
const walletAdapter = new wallet_adaptor_1.WalletAdaptor();
class TransferController {
    static initDeposit(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletId, amount, idempotencyKey } = req.body;
                const usecase = new init_deposit_use_case_1.InitDeposit(ledgerRepo, publisher, walletAdapter);
                const result = yield usecase.execute(String(walletId), Number(amount), idempotencyKey);
                return reply.status(201).send({
                    message: (result === null || result === void 0 ? void 0 : result.message) || "Unknown message",
                    transferId: result.transferId,
                });
            }
            catch (e) {
                return reply.status(201).send({
                    message: e.message,
                });
            }
        });
    }
    static confirmDeposit(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transferId, success } = req.body;
                const usecase = new confirm_deposit_use_case_1.ConfirmDeposit(ledgerRepo, walletAdapter);
                const result = yield usecase.execute(String(transferId), Boolean(success));
                return reply.status(201).send({
                    message: result,
                    transferId: transferId,
                });
            }
            catch (e) {
                return reply.status(201).send({
                    message: e.message,
                });
            }
        });
    }
}
exports.TransferController = TransferController;
