import prisma from "../../../../../lib/db/prisma";
import { WalletRepositoryPort } from "../../application/ports/wallet-repository.port";
import { MainWallet } from "../../domain/entities/main-wallet.entity";
import { Money } from "../../domain/value-objects/money.value-object";

export class WalletRepository implements WalletRepositoryPort {
    async create(wallet: MainWallet): Promise<MainWallet> {
        const record = await prisma.wallet.create({
            data: {
                walletKey: wallet.walletKey,
                accountId: wallet.accountId,
                walletType: wallet.walletType,
                balance: wallet.balance.value,
                available: wallet.available.value,
            }
        })

        console.log(record)

        return new MainWallet(
            record.walletKey,
            record.accountId,
            new Money(Number(record.balance)),
            new Money(Number(record.available))
        );
    }
    
    async findById(id: string): Promise<MainWallet | null> {
        const record = await prisma.wallet.findUnique({
            where:{id}
        })
        if(!record){
            return null
        }

        return new MainWallet(
            record.walletKey,
            record.accountId,
            new Money(Number(record.balance)),
            new Money(Number(record.available))
        );
    }
    
    async findByUserId(accountId: string): Promise<MainWallet | null> {
        const record = await prisma.wallet.findUnique({
            where:{accountId}
        })
        if(!record){
            return null
        }

        return new MainWallet(
            record.walletKey,
            record.accountId,
            new Money(Number(record.balance)),
            new Money(Number(record.available))
        );
    }

    async update(wallet: MainWallet): Promise<MainWallet> {
        const record = await prisma.wallet.update({
            where:{walletKey: wallet.walletKey},
            data: {
                walletKey: wallet.walletKey,
                accountId: wallet.accountId,
                walletType: wallet.walletType,
                balance: wallet.balance.value,
                available: wallet.available.value,
            }
        })

        return new MainWallet(
            record.walletKey,
            record.accountId,
            new Money(Number(record.balance)),
            new Money(Number(record.available))
        );
    }
	
}
