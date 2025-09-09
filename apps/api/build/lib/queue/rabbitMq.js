"use strict";
// import amqp, { Channel, ChannelModel, Connection, Options } from "amqplib";
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
exports.DEPOSIT_DLQ = exports.DEPOSIT_DLX = exports.DEPOSIT_QUEUE = exports.DEPOSIT_EXCHANGE = void 0;
exports.getRabbitChannel = getRabbitChannel;
// let connection: ChannelModel | null = null;
// let channel: Channel | null = null;
// export async function getRabbitChannel(): Promise<Channel> {
// 	if (channel) return channel;
// 	const url = process.env.RABBITMQ_URL || "amqp://localhost";
// 	connection = await amqp.connect(url);
// 	channel = await connection.createChannel();
// 	const mainQueue = process.env.RABBITMQ_DEPOSIT_QUEUE || "deposit_verify";
// 	const dlq = process.env.RABBITMQ_DEPOSIT_DLQ || "deposit.verify.dlq";
// 	const exchange = "deposit.verify.exchange";
// 	const dlx = "deposit.verify.dlx";
// 	await channel!.assertExchange(exchange, "direct", { durable: true });
// 	await channel!.assertExchange(dlx, "fanout", { durable: true });
// 	await channel!.assertQueue(dlq, { durable: true });
// 	await channel!.bindQueue(dlq, dlx, "");
// 	const args: Options.AssertQueue = {
// 		durable: true,
// 		deadLetterExchange: dlx,
// 		// optional TTL — در صورت نیاز تنظیم کن
// 		// messageTtl: 5 * 60 * 1000,
// 	};
// 	await channel!.assertQueue(mainQueue, args);
// 	await channel!.bindQueue(mainQueue, exchange, "route");
// 	return channel!;
// }
const amqplib_1 = __importDefault(require("amqplib"));
let connection = null;
let channel = null;
// ثابت کردن نام exchange و queue
exports.DEPOSIT_EXCHANGE = "deposit.verify.exchange";
exports.DEPOSIT_QUEUE = "deposit.verify";
exports.DEPOSIT_DLX = "deposit.verify.dlx";
exports.DEPOSIT_DLQ = process.env.RABBITMQ_DEPOSIT_DLQ || "deposit.verify.dlq";
function getRabbitChannel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (channel)
            return channel;
        const url = process.env.RABBITMQ_URL || "amqp://127.0.0.1";
        connection = yield amqplib_1.default.connect(url);
        channel = yield connection.createChannel();
        // ایجاد exchange و DLX
        yield channel.assertExchange(exports.DEPOSIT_EXCHANGE, "direct", { durable: true });
        yield channel.assertExchange(exports.DEPOSIT_DLX, "fanout", { durable: true });
        // DLQ
        yield channel.assertQueue(exports.DEPOSIT_DLQ, { durable: true });
        yield channel.bindQueue(exports.DEPOSIT_DLQ, exports.DEPOSIT_DLX, "");
        // Main queue با dead-letter
        const queueArgs = {
            durable: true,
            deadLetterExchange: exports.DEPOSIT_DLX,
        };
        yield channel.assertQueue(exports.DEPOSIT_QUEUE, queueArgs);
        yield channel.bindQueue(exports.DEPOSIT_QUEUE, exports.DEPOSIT_EXCHANGE, "route");
        return channel;
    });
}
