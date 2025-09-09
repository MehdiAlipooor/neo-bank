"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    constructor(value) {
        this.value = value;
        if (!this.validatePhone(value)) {
            throw new Error("Invalid phone format");
        }
    }
    getValue() {
        return this.value;
    }
    validatePhone(phone) {
        return !!phone;
    }
}
exports.Phone = Phone;
