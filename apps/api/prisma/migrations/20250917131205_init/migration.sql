-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN', 'SUPPORT', 'AUDITOR', 'MERCHANT', 'GUEST');

-- CreateEnum
CREATE TYPE "public"."TransferHolds" AS ENUM ('ACTIVE', 'CONSUMED', 'RELEASED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "public"."LedgerTransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW_PENDING', 'WITHDRAW_SETTLED', 'WITHDRAW_FAILED', 'TRANSFER_IN', 'TRANSFER_OUT');

-- CreateEnum
CREATE TYPE "public"."LedgerEntryAccount" AS ENUM ('WALLET', 'SETTLEMENT', 'FEE', 'SYSTEM', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "public"."TransferStatus" AS ENUM ('CREATED', 'RESERVED', 'SETTLED', 'FAILED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."TransferDestIdentifier" AS ENUM ('IBAN', 'CARD');

-- CreateEnum
CREATE TYPE "public"."TransferType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'INTERNAL');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "userKey" TEXT NOT NULL,
    "username" TEXT,
    "profileImageUrl" TEXT,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "accountKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'PERSONAL',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" TEXT NOT NULL,
    "walletKey" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "walletType" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "available" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "currency" TEXT NOT NULL DEFAULT 'IRR',
    "cardNumber" TEXT,
    "accountNumber" TEXT,
    "shabaNumber" TEXT,
    "icon" TEXT,
    "backgroundColor" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Hold" (
    "id" TEXT NOT NULL,
    "holdKey" TEXT NOT NULL,
    "walletKey" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "status" "public"."TransferHolds" NOT NULL DEFAULT 'ACTIVE',
    "transferKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Hold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transfer" (
    "id" TEXT NOT NULL,
    "transferKey" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "type" "public"."TransferType" NOT NULL,
    "amount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'IRR',
    "sourceWalletKey" TEXT NOT NULL,
    "destinationWalletKey" TEXT NOT NULL,
    "destIdentifier" TEXT,
    "status" "public"."TransferStatus" NOT NULL DEFAULT 'CREATED',
    "externalRef" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerTransaction" (
    "id" TEXT NOT NULL,
    "ledgerTxKey" TEXT NOT NULL,
    "transferKey" TEXT,
    "type" "public"."LedgerTransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerEntry" (
    "id" TEXT NOT NULL,
    "ledgerEntryKey" TEXT NOT NULL,
    "ledgerTxKey" TEXT NOT NULL,
    "walletKey" TEXT,
    "account" "public"."LedgerEntryAccount" NOT NULL,
    "amount" BIGINT NOT NULL,
    "type" "public"."LedgerTransactionType" NOT NULL,
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
CREATE UNIQUE INDEX "User_userKey_key" ON "public"."User"("userKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "public"."User"("createdAt");

-- CreateIndex
CREATE INDEX "User_isActive_isSuspended_idx" ON "public"."User"("isActive", "isSuspended");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "public"."RefreshToken"("token");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "public"."RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_revoked_idx" ON "public"."RefreshToken"("revoked");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "public"."RefreshToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountKey_key" ON "public"."Account"("accountKey");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "public"."Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_walletKey_key" ON "public"."Wallet"("walletKey");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_accountId_key" ON "public"."Wallet"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_cardNumber_key" ON "public"."Wallet"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_accountNumber_key" ON "public"."Wallet"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_shabaNumber_key" ON "public"."Wallet"("shabaNumber");

-- CreateIndex
CREATE INDEX "Wallet_walletKey_idx" ON "public"."Wallet"("walletKey");

-- CreateIndex
CREATE INDEX "Wallet_accountId_idx" ON "public"."Wallet"("accountId");

-- CreateIndex
CREATE INDEX "Wallet_walletType_idx" ON "public"."Wallet"("walletType");

-- CreateIndex
CREATE INDEX "Wallet_cardNumber_idx" ON "public"."Wallet"("cardNumber");

-- CreateIndex
CREATE INDEX "Wallet_accountNumber_idx" ON "public"."Wallet"("accountNumber");

-- CreateIndex
CREATE INDEX "Wallet_shabaNumber_idx" ON "public"."Wallet"("shabaNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Hold_holdKey_key" ON "public"."Hold"("holdKey");

-- CreateIndex
CREATE INDEX "Hold_walletKey_idx" ON "public"."Hold"("walletKey");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_transferKey_key" ON "public"."Transfer"("transferKey");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_idempotencyKey_key" ON "public"."Transfer"("idempotencyKey");

-- CreateIndex
CREATE INDEX "Transfer_transferKey_idx" ON "public"."Transfer"("transferKey");

-- CreateIndex
CREATE INDEX "Transfer_idempotencyKey_idx" ON "public"."Transfer"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "LedgerTransaction_ledgerTxKey_key" ON "public"."LedgerTransaction"("ledgerTxKey");

-- CreateIndex
CREATE UNIQUE INDEX "LedgerEntry_ledgerEntryKey_key" ON "public"."LedgerEntry"("ledgerEntryKey");

-- CreateIndex
CREATE INDEX "LedgerEntry_walletKey_idx" ON "public"."LedgerEntry"("walletKey");

-- CreateIndex
CREATE INDEX "LedgerEntry_account_idx" ON "public"."LedgerEntry"("account");

-- CreateIndex
CREATE INDEX "LedgerEntry_ledgerTxKey_idx" ON "public"."LedgerEntry"("ledgerTxKey");

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Hold" ADD CONSTRAINT "Hold_walletKey_fkey" FOREIGN KEY ("walletKey") REFERENCES "public"."Wallet"("walletKey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_ledgerTxKey_fkey" FOREIGN KEY ("ledgerTxKey") REFERENCES "public"."LedgerTransaction"("ledgerTxKey") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_walletKey_fkey" FOREIGN KEY ("walletKey") REFERENCES "public"."Wallet"("walletKey") ON DELETE SET NULL ON UPDATE CASCADE;
