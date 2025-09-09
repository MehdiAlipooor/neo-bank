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
exports.commitHoldHandler = exports.releaseHoldHandler = exports.createHoldHandler = void 0;
const prisma_1 = __importDefault(require("../../../../lib/db/prisma"));
const commit_hold_use_case_1 = require("../application/use-cases/commit-hold.use-case");
const create_hold_use_case_1 = require("../application/use-cases/create-hold.use-case");
const release_hold_use_case_1 = require("../application/use-cases/release-hold.use-case");
const hold_repository_1 = require("../infrastructure/repositories/hold.repository");
const ledger_repository_1 = require("../infrastructure/repositories/ledger.repository");
const transfer_repository_1 = require("../infrastructure/repositories/transfer.repository");
const walletRepo = new transfer_repository_1.TransferRepository(prisma_1.default);
const holdRepo = new hold_repository_1.HoldRepository(prisma_1.default);
const ledgerRepo = new ledger_repository_1.LedgerRepository(prisma_1.default);
// Example express-style handlers (assume express app)
const createHoldHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletId, amount } = req.body;
    try {
        const usecase = new create_hold_use_case_1.CreateHoldUseCase(walletRepo, holdRepo);
        // run inside transaction to lock wallet row and persist hold atomically
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // optional: lock wallet row with raw SELECT FOR UPDATE
            yield tx.$queryRaw `SELECT id FROM "Wallet" WHERE id = ${walletId} FOR UPDATE`;
            return usecase.execute(walletId, amount, tx);
        }));
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
exports.createHoldHandler = createHoldHandler;
const releaseHoldHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { holdId } = req.body;
    try {
        const usecase = new release_hold_use_case_1.ReleaseHoldUseCase(walletRepo, holdRepo);
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () { return usecase.execute(holdId, tx); }));
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
exports.releaseHoldHandler = releaseHoldHandler;
const commitHoldHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { holdId } = req.body;
    try {
        const usecase = new commit_hold_use_case_1.CommitHoldUseCase(walletRepo, holdRepo, ledgerRepo);
        const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () { return usecase.execute(holdId, tx); }));
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: String(err) });
    }
});
exports.commitHoldHandler = commitHoldHandler;
