"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const base_exception_1 = require("./base-exception");
class ConflictException extends base_exception_1.BaseException {
    constructor(message) {
        super(message, "ConflictException");
    }
}
exports.ConflictException = ConflictException;
