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
exports.TokenService = void 0;
const paseto_1 = require("paseto");
const RefreshToken_1 = require("../entities/RefreshToken");
function generateLocalKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield paseto_1.V4.generateKey("public");
        return key;
    });
}
class TokenService {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    generateTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.privateKey);
            const key = yield generateLocalKey();
            const accessToken = yield paseto_1.V4.sign({ id: userId }, key, {
                expiresIn: "7 day",
            });
            const refreshTokenString = crypto.randomUUID();
            const refreshToken = RefreshToken_1.RefreshToken.create(userId, refreshTokenString);
            return { accessToken, refreshToken };
        });
    }
}
exports.TokenService = TokenService;
