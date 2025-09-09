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
exports.ConfirmDeposit = void 0;
const Money_1 = require("../../../wallet/domain/value-objects/Money");
const transfer_objects_enum_1 = require("../../domain/enums/transfer-objects.enum");
class ConfirmDeposit {
    constructor(ledgerRepo, walletAdaptor) {
        this.ledgerRepo = ledgerRepo;
        this.walletAdaptor = walletAdaptor;
    }
    execute(transferId, success) {
        return __awaiter(this, void 0, void 0, function* () {
            const transfer = yield this.ledgerRepo.findTransferById(transferId);
            if (!transfer) {
                throw new Error("transfer_not_found");
            }
            if (!success) {
                yield this.ledgerRepo.updateTransferStatus(transferId, transfer_objects_enum_1.TransferStatus.FAILED);
                return { status: "failed" };
            }
            // credit wallet through port (no direct Entity import)
            yield this.walletAdaptor.credit(transfer.sourceWalletId, new Money_1.Money(parseFloat(transfer.amount.toString())));
            yield this.ledgerRepo.updateTransferStatus(transferId, transfer_objects_enum_1.TransferStatus.COMPLETED);
            return { status: "COMPLETED" };
        });
    }
}
exports.ConfirmDeposit = ConfirmDeposit;
