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
exports.HoldRepository = void 0;
const hold_entity_1 = require("../../domain/entities/hold.entity");
const hold_status_vo_1 = require("../../domain/value-objects/hold-status.vo");
class HoldRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(hold, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            const rec = yield client.hold.create({
                data: {
                    id: hold.id,
                    walletId: hold.walletId,
                    amount: hold.amount,
                    status: hold.status,
                    // transferId: hold.transferId ?? null
                },
            });
            return new hold_entity_1.Hold(rec.id, rec.walletId, rec.amount);
        });
    }
    update(hold, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            yield client.hold.update({
                where: { id: hold.id },
                data: { status: hold.status },
            });
        });
    }
    findActiveByTransfer(transferId, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            const rows = yield client.hold.findMany({
                where: { transferId, status: hold_status_vo_1.HoldStatus.ACTIVE },
            });
            return rows.map((r) => new hold_entity_1.Hold(r.id, r.walletId, r.amount, r.status, r.createdAt));
        });
    }
    findById(id, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = tx !== null && tx !== void 0 ? tx : this.prisma;
            const record = yield client.hold.findUnique({ where: { id } });
            if (!record) {
                return null;
            }
            return new hold_entity_1.Hold(record.id, record.walletId, record.amount, record.status, record.createdAt);
        });
    }
}
exports.HoldRepository = HoldRepository;
