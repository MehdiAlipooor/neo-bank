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
exports.loginUserController = loginUserController;
const auth_repository_1 = require("../../infrastructure/repositories/auth-repository");
const refresh_token_repo_1 = require("../../infrastructure/repositories/refresh-token.repo");
const login_user_use_case_1 = require("../../application/use-cases/login-user.use-case");
const issue_token_use_case_1 = require("../../application/use-cases/issue-token.use-case");
const RefreshToken_service_1 = require("../../domain/services/RefreshToken.service");
const repo = new auth_repository_1.AuthRepository();
const privateKeyBase64 = process.env.PASETO_PRIVATE_KEY;
if (!privateKeyBase64)
    throw new Error("PASETO_PRIVATE_KEY is not set");
const privateKey = Uint8Array.from(Buffer.from(privateKeyBase64, "base64"));
const tokenService = new RefreshToken_service_1.TokenService(privateKey);
const refreshTokenRepo = new refresh_token_repo_1.RefreshTokenRepository();
const issueTokensUseCase = new issue_token_use_case_1.IssueTokensUseCase(tokenService, refreshTokenRepo);
const loginUser = new login_user_use_case_1.LoginUserUseCase(repo, issueTokensUseCase);
function loginUserController(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield loginUser.execute(req.body);
            reply.code(201).send(user);
        }
        catch (err) {
            reply.code(400).send({ error: err.message });
        }
    });
}
