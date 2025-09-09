"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const RoleTypes_1 = require("../enums/RoleTypes");
class Role {
    constructor(value) {
        if (!this.isValid(value)) {
            throw new Error(`Invalid role: ${value}`);
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    isValid(value) {
        return Object.values(RoleTypes_1.RoleTypes).includes(value);
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Role = Role;
