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
exports.LoginUserUseCase = void 0;
const create_wallet_1 = require("../../../wallet/application/use-cases/create-wallet");
const wallet_repository_1 = require("../../../wallet/infrastructure/repositories/wallet.repository");
const User_1 = require("../../domain/entities/User");
const Phone_1 = require("../../domain/value-objects/Phone");
const walletRepo = new wallet_repository_1.WalletRepository();
class LoginUserUseCase {
    constructor(authRepo, issueTokenUseCase) {
        this.authRepo = authRepo;
        this.issueTokenUseCase = issueTokenUseCase;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let phone;
            const username = dto.username;
            try {
                phone = new Phone_1.Phone(dto.phone);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Validation failed: ${error.message}`);
                }
                throw new Error("Validation failed: Unknown error");
            }
            let user = (yield this.authRepo.findByPhone(phone.getValue()));
            /**
             * @description If no user, the user will be generated, and an empty wallet will be generated too
             */
            if (!user) {
                const userSchema = User_1.User.create(username, phone.getValue());
                yield this.authRepo.save(userSchema);
                user = userSchema;
                // Step 3: create wallet for persisted user
                const createWallet = new create_wallet_1.CreateWallet(walletRepo);
                yield createWallet.execute({ userId: user.id });
            }
            const tokens = yield this.issueTokenUseCase.execute(user === null || user === void 0 ? void 0 : user.id);
            return {
                user,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
