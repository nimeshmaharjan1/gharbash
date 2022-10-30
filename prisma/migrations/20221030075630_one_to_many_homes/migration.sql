/* AlterTable - Add ownerId as an optional column */
ALTER TABLE "Home" ADD COLUMN "ownerId" TEXT;

/* UpdateData - Add default owner value to existing homes */
UPDATE "Home" SET "ownerId" = 'cl9v0d75u0000usuopnsn1jnw' WHERE "ownerId" IS NULL;

/* AlterColumn - Change ownerId to a required column */
ALTER TABLE "Home" ALTER COLUMN "ownerId" SET NOT NULL;

/* AddForeignKey */
ALTER TABLE "Home" ADD CONSTRAINT "Home_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;