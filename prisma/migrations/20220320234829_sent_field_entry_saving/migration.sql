/*
  Warnings:

  - You are about to drop the column `fee` on the `Saving` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EntrySaving" ADD COLUMN     "fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "fee";
