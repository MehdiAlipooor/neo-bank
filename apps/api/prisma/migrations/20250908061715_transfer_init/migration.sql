-- CreateIndex
CREATE INDEX "Transfer_idempotencyKey_type_id_idx" ON "public"."Transfer"("idempotencyKey", "type", "id");
