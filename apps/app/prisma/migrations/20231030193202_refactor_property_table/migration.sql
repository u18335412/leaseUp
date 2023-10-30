/*
  Warnings:

  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyOwnerId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `streetName` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "address",
ADD COLUMN     "streetName" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'MULTIFAMILY',
ALTER COLUMN "type" SET DEFAULT 'RESIDENTIAL';

-- CreateIndex
CREATE UNIQUE INDEX "Property_propertyOwnerId_key" ON "Property"("propertyOwnerId");
