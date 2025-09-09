"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferEntity = void 0;
const transfer_objects_enum_1 = require("../enums/transfer-objects.enum");
// همان مدلِ شما — فقط نام مدل‌ها را عینا گذاشتم
class TransferEntity {
    constructor(id, type, amount, sourceWalletId, destIdentifier, status = transfer_objects_enum_1.TransferStatus.CREATED, idempotencyKey, metadata, createdAt, updatedAt) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.sourceWalletId = sourceWalletId;
        this.destIdentifier = destIdentifier;
        this.status = status;
        this.idempotencyKey = idempotencyKey;
        this.metadata = metadata;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.TransferEntity = TransferEntity;
