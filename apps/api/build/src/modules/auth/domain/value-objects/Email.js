"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(value) {
        this.value = value;
        if (!this.validateEmail(value)) {
            throw new Error("Invalid email format");
        }
    }
    getValue() {
        return this.value;
    }
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
exports.Email = Email;
