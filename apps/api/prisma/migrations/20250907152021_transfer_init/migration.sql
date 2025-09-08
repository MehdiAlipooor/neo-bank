-- CreateEnum
CREATE TYPE "public"."TransferHolds" AS ENUM ('ACTIVE', 'CONSUMED', 'RELEASED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."LedgerTransactionType" AS ENUM ('WITHDRAW_PENDING', 'WITHDRAW_SETTLED', 'TRANSFER');

-- CreateEnum
CREATE TYPE "public"."LedgerEntryAccoun" AS ENUM ('WALLET', 'SETTLEMENT', 'FEE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "public"."TransferStatus" AS ENUM ('CREATED', 'RESERVED', 'SETTLED', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."TransferDestIdentifier" AS ENUM ('IBAN', 'card');

-- CreateEnum
CREATE TYPE "public"."TransferType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'INTERNAL');

-- CreateTable
CREATE TABLE "public"."Transfer" (
    "id" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "type" "public"."TransferType" NOT NULL,
    "amount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'IRR',
    "sourceWalletId" TEXT NOT NULL,
    "destIdentifier" TEXT,
    "status" "public"."TransferStatus" NOT NULL DEFAULT 'CREATED',
    "externalRef" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hold" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "status" "public"."TransferHolds" NOT NULL DEFAULT 'ACTIVE',
    "transferId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Hold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerTransaction" (
    "id" TEXT NOT NULL,
    "transferId" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerEntry" (
    "id" TEXT NOT NULL,
    "txId" TEXT NOT NULL,
    "walletId" TEXT,
    "account" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OutboxEvent" (
    "id" TEXT NOT NULL,
    "aggregateId" TEXT,
    "aggregateType" TEXT,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_idempotencyKey_key" ON "public"."Transfer"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Hold_walletId_idx" ON "public"."Hold"("walletId");

-- CreateIndex
CREATE INDEX "LedgerEntry_walletId_idx" ON "public"."LedgerEntry"("walletId");

-- CreateIndex
CREATE INDEX "LedgerEntry_account_idx" ON "public"."LedgerEntry"("account");

-- AddForeignKey
ALTER TABLE "public"."Hold" ADD CONSTRAINT "Hold_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_txId_fkey" FOREIGN KEY ("txId") REFERENCES "public"."LedgerTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
