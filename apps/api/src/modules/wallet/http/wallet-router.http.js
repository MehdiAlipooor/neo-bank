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
exports.registerWalletRoutes = registerWalletRoutes;
const wallet_controller_https_1 = require("./wallet-controller.https");
function registerWalletRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new wallet_controller_https_1.WalletController();
        app.post("/wallet", controller.createWallet.bind(controller));
        // app.post("/wallet/deposit", controller.depositFunds.bind(controller));
        // app.post("/wallet/withdraw", controller.withdrawFunds.bind(controller));
        // app.get("/wallet/:id/balance", controller.getBalance.bind(controller));
    });
}
