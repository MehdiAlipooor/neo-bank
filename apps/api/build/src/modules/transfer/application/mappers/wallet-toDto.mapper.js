"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletToDto = void 0;
const walletToDto = (input) => {
    return {
        id: input.id,
        userId: input.userId,
        balance: input.balance.value,
        cardNumber: input.cardNumber,
        accountNumber: input.accountNumber,
        shabaNumber: input.shabaNumber,
        isRemoved: input.isRemoved,
    };
};
exports.walletToDto = walletToDto;
