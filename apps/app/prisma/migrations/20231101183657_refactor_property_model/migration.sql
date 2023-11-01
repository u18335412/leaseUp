/*
  Warnings:

  - You are about to drop the column `streetName` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `Property` table. All the data in the column will be lost.
  - Added the required column `street` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "streetName",
DROP COLUMN "streetNumber",
ADD COLUMN     "street" TEXT NOT NULL;
