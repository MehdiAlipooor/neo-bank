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
// scripts/generate-keys.ts
const paseto_1 = require("paseto");
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // 1) تولید کلید خصوصی سازگار با v4.public
    const privateKeyObj = yield paseto_1.V4.generateKey("public");
    // 2) استخراجِ کلید عمومی متناظر
    const publicKeyObj = (0, node_crypto_1.createPublicKey)(privateKeyObj);
    // 3) تبدیل هر دو به DER → base64
    const privateKeyDer = privateKeyObj.export({ format: "der", type: "pkcs8" });
    const publicKeyDer = publicKeyObj.export({ format: "der", type: "spki" });
    const privateKeyB64 = Buffer.from(privateKeyDer).toString("base64");
    const publicKeyB64 = Buffer.from(publicKeyDer).toString("base64");
    // 4) ذخیره در .env (اگر قبلاً وجود دارد Append/Overwrite کن)
    const env = `PASETO_PRIVATE_KEY=${privateKeyB64}
PASETO_PUBLIC_KEY=${publicKeyB64}
`;
    (0, node_fs_1.writeFileSync)(".env", env);
    console.log("✅ PASETO key‑pair generated and saved to .env");
}))();
