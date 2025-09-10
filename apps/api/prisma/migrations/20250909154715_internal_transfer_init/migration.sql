/*
  Warnings:

  - Added the required column `type` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."TransferStatus" ADD VALUE 'COMPLETED';

-- AlterTable
ALTER TABLE "public"."LedgerEntry" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Wallet" ADD COLUMN     "available" DECIMAL(65,30) NOT NULL DEFAULT 0.00;
