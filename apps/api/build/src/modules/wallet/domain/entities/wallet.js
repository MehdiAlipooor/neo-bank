"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const Money_1 = require("../value-objects/Money");
class Wallet {
    constructor(id, userId, balance, available, cardNumber, accountNumber, shabaNumber, isRemoved = false, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.available = available;
        this.cardNumber = cardNumber;
        this.accountNumber = accountNumber;
        this.shabaNumber = shabaNumber;
        this.isRemoved = isRemoved;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.balance = new Money_1.Money(balance);
    }
    canPlacehold(amount) {
        return this.available.gte(amount);
    }
    applyHold(amount) {
        if (!this.canPlacehold(amount)) {
            throw new Error("insufficient_available_balance");
        }
        this.available = this.available.subtract(amount);
    }
    releaseHold(amount) {
        this.available = this.available.add(amount);
    }
    deposit(amount) {
        this.balance = this.balance.add(amount);
    }
    withdraw(amount) {
        this.balance = this.balance.subtract(amount);
    }
    getBalance() {
        return this.balance.value;
    }
}
exports.Wallet = Wallet;
// import { Decimal } from "@prisma/client/runtime/library";
// import { Money } from "../value-objects/Money";
// export class Wallet {
//     private balance: Money;
//     constructor(
//         public readonly id: string,
//         public readonly userId: string,
//         balance: number = 0,
//         public cardNumber?: string,
//         public accountNumber?: string,
//         public shabaNumber?: string,
//         public isRemoved: boolean = false,
//         public createdAt: Date = new Date(),
//         public updatedAt: Date = new Date()
//     ) {
//         this.balance = new Money(balance);
//     }
//     static create(
//         userId: string,
//         balance: number = 0,
//         cardNumber?: string,
//         accountNumber?: string,
//         shabaNumber?: string
//     ) {
//         return new Wallet(
//             crypto.randomUUID(),
//             userId,
//             balance,
//             cardNumber,
//             accountNumber,
//             shabaNumber,
//             false,
//             new Date(),
//             new Date()
//         );
//     }
//     remove() {
//         this.isRemoved = true;
//     }
//     addBalance(amount: number | Decimal) {
//         this.balance = Number(this.balance) + Number(amount);
//     }
//     subtractBalance(amount: number | Decimal) {
//         if (Number(amount) > Number(this.balance)) {
//             throw new Error("Insufficient balance");
//         }
//         this.balance = Number(this.balance) - Number(amount);
//     }
//     deposit(amount: Money): void {
//         this.balance = this.balance.add(amount);
//     }
//     withdraw(amount: Money): void {
//         this.balance = this.balance.subtract(amount);
//     }
//     getBalance(): number {
//         return this.balance.value;
//     }
// }
