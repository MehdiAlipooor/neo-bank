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
exports.registerUserHandler = registerUserHandler;
const register_user_use_case_1 = require("../../application/use-cases/register-user.use-case");
const auth_repository_1 = require("../../infrastructure/repositories/auth-repository");
const repo = new auth_repository_1.AuthRepository();
const registerUser = new register_user_use_case_1.RegisterUserUseCase(repo);
function registerUserHandler(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield registerUser.execute(req.body);
            reply.code(201).send({ id: user.phone, email: user.id });
        }
        catch (err) {
            reply.code(400).send({ error: err.message });
        }
    });
}
