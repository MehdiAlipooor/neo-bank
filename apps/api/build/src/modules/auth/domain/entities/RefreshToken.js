"use strict";
// domain/entities/RefreshToken.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
class RefreshToken {
    constructor(id, userId, token, expiresAt, revoked = false, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.expiresAt = expiresAt;
        this.revoked = revoked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(userId, token, ttlInDays = 30) {
        const expiresAt = new Date(Date.now() + ttlInDays * 24 * 60 * 60 * 1000);
        return new RefreshToken(crypto.randomUUID(), userId, token, expiresAt);
    }
    revoke() {
        return new RefreshToken(this.id, this.userId, this.token, this.expiresAt, true, this.createdAt, new Date());
    }
}
exports.RefreshToken = RefreshToken;
