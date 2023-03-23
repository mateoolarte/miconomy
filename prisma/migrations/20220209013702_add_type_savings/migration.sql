/*
  Warnings:

  - You are about to drop the column `currentValue` on the `Saving` table. All the data in the column will be lost.
  - Added the required column `value` to the `Saving` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "currentValue",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT E'saving',
ADD COLUMN     "value" INTEGER NOT NULL;
