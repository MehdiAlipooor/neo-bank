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
exports.RegisterUserUseCase = void 0;
const create_wallet_1 = require("../../../wallet/application/use-cases/create-wallet");
const wallet_repository_1 = require("../../../wallet/infrastructure/repositories/wallet.repository");
const User_1 = require("../../domain/entities/User");
const Phone_1 = require("../../domain/value-objects/Phone");
const Username_1 = require("../../domain/value-objects/Username");
const walletRepo = new wallet_repository_1.WalletRepository();
class RegisterUserUseCase {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone;
            let username;
            try {
                phone = new Phone_1.Phone(dto.phone);
                username = new Username_1.Username(dto.username);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Validation failed: ${error.message}`);
                }
                throw new Error("Validation failed: Unknown error");
            }
            const existing = yield this.authRepo.findByPhone(phone.getValue());
            if (existing) {
                throw new Error("User already exists");
            }
            // Step 1: create domain user entity
            const user = User_1.User.create(username.getValue(), phone.getValue());
            // Step 2: save user in DB
            yield this.authRepo.save(user);
            // Step 3: create wallet for persisted user
            const createWallet = new create_wallet_1.CreateWallet(walletRepo);
            yield createWallet.execute({ userId: user.id });
            return user;
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
