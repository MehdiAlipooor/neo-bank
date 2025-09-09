"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
class Username {
    constructor(value) {
        if (!this.validate(value)) {
            throw new Error("Invalid username format");
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    validate(name) {
        // Example rules:
        // - 3 to 30 chars
        // - Letters, numbers, underscores only
        // - No spaces or special chars
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        return usernameRegex.test(name);
    }
}
exports.Username = Username;
