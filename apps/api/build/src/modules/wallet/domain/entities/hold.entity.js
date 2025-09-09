"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hold = void 0;
const hold_status_vo_1 = require("../value-objects/hold-status.vo");
class Hold {
    constructor(id, walletId, amount, status = hold_status_vo_1.HoldStatus.ACTIVE, createdAt = new Date()) {
        this.id = id;
        this.walletId = walletId;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }
    release() {
        if (this.status !== hold_status_vo_1.HoldStatus.ACTIVE) {
            throw new Error("hold_not_active");
        }
        this.status = hold_status_vo_1.HoldStatus.RELEASED;
    }
    consume() {
        if (this.status !== hold_status_vo_1.HoldStatus.CONSUMED) {
            throw new Error("hold_not_active");
        }
        this.status = hold_status_vo_1.HoldStatus.CONSUMED;
    }
}
exports.Hold = Hold;
