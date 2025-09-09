"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const base_exception_1 = require("./base-exception");
class NotFoundException extends base_exception_1.BaseException {
    constructor(message) {
        super(message, "NotFoundException");
    }
}
exports.NotFoundException = NotFoundException;
