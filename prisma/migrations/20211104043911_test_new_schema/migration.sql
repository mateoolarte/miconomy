/*
  Warnings:

  - You are about to drop the column `isActive` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `userMonthId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BudgetCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetSavingCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BudgetSavingItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavingCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavingTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMonth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMonthCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMonthSavingCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMonthSavingItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[value]` on the table `Month` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `entryId` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Month` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_budgetCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingCategory" DROP CONSTRAINT "BudgetSavingCategory_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingItem" DROP CONSTRAINT "BudgetSavingItem_budgetSavingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetSavingItem" DROP CONSTRAINT "BudgetSavingItem_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userMonthCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SavingCategory" DROP CONSTRAINT "SavingCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavingTransaction" DROP CONSTRAINT "SavingTransaction_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonth" DROP CONSTRAINT "UserMonth_monthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonth" DROP CONSTRAINT "UserMonth_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthCategory" DROP CONSTRAINT "UserMonthCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthCategory" DROP CONSTRAINT "UserMonthCategory_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingCategory" DROP CONSTRAINT "UserMonthSavingCategory_userMonthId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingItem" DROP CONSTRAINT "UserMonthSavingItem_savingCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserMonthSavingItem" DROP CONSTRAINT "UserMonthSavingItem_userMonthSavingCategoryId_fkey";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "date",
DROP COLUMN "itemId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "entryId" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "date",
DROP COLUMN "updated",
DROP COLUMN "userId",
DROP COLUMN "userMonthId",
ADD COLUMN     "entryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Month" DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "BudgetCategory";

-- DropTable
DROP TABLE "BudgetItem";

-- DropTable
DROP TABLE "BudgetSavingCategory";

-- DropTable
DROP TABLE "BudgetSavingItem";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "SavingCategory";

-- DropTable
DROP TABLE "SavingTransaction";

-- DropTable
DROP TABLE "UserMonth";

-- DropTable
DROP TABLE "UserMonthCategory";

-- DropTable
DROP TABLE "UserMonthSavingCategory";

-- DropTable
DROP TABLE "UserMonthSavingItem";

-- DropEnum
DROP TYPE "SavingTransactionType";

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "monthId" INTEGER NOT NULL,
    "yearId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Saving" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "goal" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Saving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryCategory" (
    "entryId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "EntryCategory_pkey" PRIMARY KEY ("entryId","categoryId")
);

-- CreateTable
CREATE TABLE "EntrySaving" (
    "entryId" INTEGER NOT NULL,
    "savingId" INTEGER NOT NULL,

    CONSTRAINT "EntrySaving_pkey" PRIMARY KEY ("entryId","savingId")
);

-- CreateTable
CREATE TABLE "SavingBudget" (
    "budgetId" INTEGER NOT NULL,
    "savingId" INTEGER NOT NULL,

    CONSTRAINT "SavingBudget_pkey" PRIMARY KEY ("budgetId","savingId")
);

-- CreateTable
CREATE TABLE "CategoryBudget" (
    "budgetId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoryBudget_pkey" PRIMARY KEY ("categoryId","budgetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Year_value_key" ON "Year"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Month_value_key" ON "Month"("value");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryCategory" ADD CONSTRAINT "EntryCategory_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryCategory" ADD CONSTRAINT "EntryCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrySaving" ADD CONSTRAINT "EntrySaving_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrySaving" ADD CONSTRAINT "EntrySaving_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES "Saving"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingBudget" ADD CONSTRAINT "SavingBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingBudget" ADD CONSTRAINT "SavingBudget_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES "Saving"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryBudget" ADD CONSTRAINT "CategoryBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryBudget" ADD CONSTRAINT "CategoryBudget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
