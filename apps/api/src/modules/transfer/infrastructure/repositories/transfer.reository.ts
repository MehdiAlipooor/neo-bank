import prisma from "../../../../../lib/db/prisma";
import { TransferRepositoryPort } from "../../application/ports/transfer-repository.port";
import { Transfer } from "../../domain/entites/transfer.entity";

export class TransferRepository implements TransferRepositoryPort{
    
    async create(transfer: Transfer): Promise<Transfer> {
        if(!transfer.destinationWalletKey){
            throw new Error('destinationWalletKey_is_required')
        }
        
         await prisma.transfer.create({
            data: {
                id: transfer.id,
                sourceWalletKey: transfer.sourceWalletKey,
                destinationWalletKey: transfer.destinationWalletKey,
                type: transfer.type,
                amount: transfer.amount,
                status: transfer.status,
                metadata: transfer.metadata,
                transferKey: ''
            }
        })
        
        return transfer
    }
    
    async updateStatus(id: string, status: "CREATED" | "RESERVED" | "SETTLED" | "FAILED" | "COMPLETED"): Promise<void> {
        await prisma.transfer.update({where: {id}, data:{status}})
    }

    async findById(id: string, status: string): Promise<Transfer | null> {
        const row = await prisma.transfer.findUnique({ where: { id } });
        if(!row){
            return null
        }

        return new Transfer(
            row.id,
            row.sourceWalletKey,
            row.type,
            row.amount,
            row.status,
            row.destinationWalletKey,
            row.metadata,
        )
    }
}