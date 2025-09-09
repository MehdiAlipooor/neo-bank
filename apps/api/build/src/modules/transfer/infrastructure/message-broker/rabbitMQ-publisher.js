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
exports.RabbitMqPublisher = void 0;
const rabbitMq_1 = require("../../../../../lib/queue/rabbitMq");
class RabbitMqPublisher {
    publishDepositVerify(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const ch = yield (0, rabbitMq_1.getRabbitChannel)();
            ch.publish(rabbitMq_1.DEPOSIT_EXCHANGE, "route", Buffer.from(JSON.stringify(payload)), { persistent: true });
        });
    }
}
exports.RabbitMqPublisher = RabbitMqPublisher;
