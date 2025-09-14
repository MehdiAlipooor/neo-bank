import { Transfer } from "../../../transfer/domain/entites/transfer.entity";

export function createTransferDto(transfer: Transfer){
    return {
        id: transfer.id,
        sourceWalletKey: transfer.sourceWalletKey,
        destinationWalletKey: transfer.destinationWalletKey,
        type: transfer.type,
        amount: transfer.amount,
        status: transfer.status,
        metadata: transfer.metadata,
        transferKey: ''
    }
}