"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const RoleTypes_1 = require("../enums/RoleTypes");
class User {
    constructor(id, username, profileImageUrl, phone, isActive, isSuspended, role, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.username = username;
        this.profileImageUrl = profileImageUrl;
        this.phone = phone;
        this.isActive = isActive;
        this.isSuspended = isSuspended;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(username, phone) {
        const id = crypto.randomUUID();
        const isActive = true;
        const isSuspended = false;
        const profileImageUrl = "";
        const role = RoleTypes_1.RoleTypes.USER;
        return new User(id, username, profileImageUrl, phone, isActive, isSuspended, role);
    }
}
exports.User = User;
