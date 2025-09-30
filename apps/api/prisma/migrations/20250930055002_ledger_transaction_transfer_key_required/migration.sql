/*
  Warnings:

  - A unique constraint covering the columns `[transferKey]` on the table `LedgerTransaction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transferKey` on table `LedgerTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."LedgerTransaction" ALTER COLUMN "transferKey" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LedgerTransaction_transferKey_key" ON "public"."LedgerTransaction"("transferKey");
