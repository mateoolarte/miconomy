-- AlterTable
ALTER TABLE "Saving" ADD COLUMN     "fee" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currencyCode" TEXT NOT NULL DEFAULT E'COP';
