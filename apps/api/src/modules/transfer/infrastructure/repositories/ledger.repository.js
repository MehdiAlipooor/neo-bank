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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerRepository = void 0;
const prisma_1 = __importDefault(require("../../../../../lib/db/prisma"));
class LedgerRepository {
    createTransfer(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.transfer.create({
                data: {
                    id: transfer.id,
                    type: transfer.type,
                    amount: transfer.amount.value,
                    sourceWalletId: transfer.sourceWalletId,
                    destIdentifier: transfer.destIdentifier,
                    metadata: transfer.metadata,
                    idempotencyKey: transfer.idempotencyKey,
                },
            });
        });
    }
    createLedgerTxWithEntry(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.ledgerTransaction.create({
                    data: {
                        id: params.txId,
                        transferId: params.transferId,
                        type: params.type,
                        ledgerEntries: {
                            create: {
                                id: params.entry.id,
                                walletId: params.entry.walletId,
                                account: params.entry.account,
                                amount: params.entry.amount.value,
                                metadata: params.entry.metadata || null,
                            },
                        },
                    },
                });
            }));
        });
    }
    findTransferById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rec = yield prisma_1.default.transfer.findUnique({ where: { id } });
            if (!rec)
                return null;
            return {
                id: rec.id,
                idempotencyKey: rec.idempotencyKey,
                type: rec.type,
                amount: rec.amount,
                //   currency: rec.currency,
                sourceWalletId: rec.sourceWalletId,
                destIdentifier: rec.destIdentifier,
                status: rec.status,
                //   externalRef: rec.externalRef,
                metadata: rec.metadata,
                createdAt: rec.createdAt,
                updatedAt: rec.updatedAt,
            };
        });
    }
    findTransferByIdempotencyKey(idempotencyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const rec = yield prisma_1.default.transfer.findUnique({ where: { idempotencyKey } });
            if (!rec)
                return null;
            return {
                id: rec.id,
                idempotencyKey: rec.idempotencyKey,
                type: rec.type,
                amount: rec.amount,
                sourceWalletId: rec.sourceWalletId,
                destIdentifier: rec.destIdentifier,
                status: rec.status,
                metadata: rec.metadata,
                createdAt: rec.createdAt,
                updatedAt: rec.updatedAt,
            };
        });
    }
    updateTransferStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.transfer.update({
                where: { id },
                data: { status: status },
            });
        });
    }
    findAllCreatedTransfers(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield prisma_1.default.transfer.findMany({
                where: { status: "CREATED" },
                orderBy: { createdAt: "asc" },
                take: limit,
            });
            return rows.map((r) => ({
                id: r.id,
                idempotencyKey: r.idempotencyKey,
                type: r.type,
                amount: r.amount,
                currency: r.currency,
                sourceWalletId: r.sourceWalletId,
                destIdentifier: r.destIdentifier,
                status: r.status,
                externalRef: r.externalRef,
                metadata: r.metadata,
                createdAt: r.createdAt,
                updatedAt: r.updatedAt,
            }));
        });
    }
    createDepositTransaction(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, walletId, amount, idempotencyKey, txId, }) {
            yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // 1️⃣ Transfer
                yield tx.transfer.create({
                    data: {
                        id,
                        type: "DEPOSIT",
                        amount: amount.value,
                        sourceWalletId: walletId,
                        idempotencyKey,
                        status: "CREATED",
                    },
                });
                // 2️⃣ LedgerTransaction
                yield tx.ledgerTransaction.create({
                    data: {
                        id: txId,
                        transferId: id,
                        type: "deposit",
                    },
                });
                // 3️⃣ LedgerEntry
                yield tx.ledgerEntry.create({
                    data: {
                        id: crypto.randomUUID(),
                        txId,
                        walletId,
                        account: `wallet:${walletId}`,
                        amount: amount.value,
                        metadata: { note: "init deposit pending" },
                    },
                });
            }));
        });
    }
}
exports.LedgerRepository = LedgerRepository;
