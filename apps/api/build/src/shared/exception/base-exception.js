"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message, name = "BaseException") {
        super(message);
        this.name = name;
        this.name = name;
    }
}
exports.BaseException = BaseException;
