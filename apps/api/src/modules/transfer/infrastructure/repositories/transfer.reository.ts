import type { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/db/prisma";
import type { TransferRepositoryPort } from "../../application/ports/transfer-repository.port";
import { Transfer } from "../../domain/entites/transfer.entity";

export class TransferRepository implements TransferRepositoryPort {
  async existsByIdempotencyKey(
    idempotencyKey: string,
    tx: Prisma.TransactionClient
  ): Promise<boolean> {
    const record = await tx.transfer.findUnique({
      where: { idempotencyKey },
    });
    return !!record;
  }

  async create(
    transfer: Transfer,
    idempotencyKey: string,
    tx: Prisma.TransactionClient
  ): Promise<Transfer> {
    if (transfer.type !== "DEPOSIT" && !transfer.destinationWalletKey) {
      throw new Error("destinationWalletKey_is_required");
    }

    await tx.transfer.create({
      data: {
        id: transfer.id,
        sourceWalletKey: transfer.sourceWalletKey,
        destinationWalletKey:
          transfer.destinationWalletKey ?? "DEPOSIT_CURRENT_WALLET",
        type: transfer.type,
        amount: transfer.amount,
        status: transfer.status,
        idempotencyKey: idempotencyKey,
        metadata: transfer.metadata,
        transferKey: transfer.transferKey,
      },
    });

    return transfer;
  }

  async updateStatus(
    id: string,
    status: "CREATED" | "RESERVED" | "SETTLED" | "FAILED" | "COMPLETED",
    tx: Prisma.TransactionClient
  ): Promise<void> {
    await tx.transfer.update({ where: { id }, data: { status } });
  }

  async findById(id: string, _status: string): Promise<Transfer | null> {
    const row = await prisma.transfer.findUnique({ where: { id } });
    if (!row) {
      return null;
    }

    return new Transfer(
      row.id,
      row.sourceWalletKey,
      row.type,
      Number(row.amount),
      row.status,
      row.transferKey,
      row.destinationWalletKey,
      row.metadata
    );
  }
}
