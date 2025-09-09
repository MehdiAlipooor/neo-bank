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
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const auth_module_1 = require("./modules/auth/auth.module");
const wallet_module_1 = require("./modules/wallet/wallet-module");
const module_1 = require("./modules/transfer/module");
const app = (0, fastify_1.default)({ logger: true });
const port = (process.env.PORT || 7000);
app.register(auth_module_1.authModule);
app.register(wallet_module_1.walletRoutes);
app.register(module_1.transferModule);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen({ port: port });
        console.log(`Server listening at http://localhost:${port}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
