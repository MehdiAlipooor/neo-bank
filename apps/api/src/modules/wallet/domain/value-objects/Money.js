"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
class Money {
    constructor(amount) {
        if (!Number.isFinite(amount) || amount <= 0) {
            throw new Error("Money amount cannot be negative");
        }
        this.amount = amount;
    }
    add(other) {
        return new Money(this.amount + other.amount);
    }
    subtract(other) {
        if (other.amount > this.amount) {
            throw new Error("Insufficient funds");
        }
        return new Money(this.amount - other.amount);
    }
    get value() {
        return this.amount;
    }
    gte(other) {
        return this.amount >= other.amount;
    }
}
exports.Money = Money;
