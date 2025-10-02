/*
  Warnings:

  - You are about to drop the `OutboxEvent` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `idempotencyKey` on table `Transfer` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."LedgerStatus" AS ENUM ('PENDING', 'SETTLED', 'FAILED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."LedgerTransaction" ADD COLUMN     "status" "public"."LedgerStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."Transfer" ALTER COLUMN "idempotencyKey" SET NOT NULL;

-- DropTable
DROP TABLE "public"."OutboxEvent";
