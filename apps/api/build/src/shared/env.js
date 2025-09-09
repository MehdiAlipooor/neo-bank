"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    DATABASE_URL: process.env.DATABASE_URL,
    PASETO_PRIVATE_KEY: process.env.PASETO_PRIVATE_KEY, // base64
    PASETO_PUBLIC_KEY: process.env.PASETO_PUBLIC_KEY, // base64
};
