/*
  Warnings:

  - You are about to drop the column `marketRent` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfBathrooms` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfBedrooms` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `occupied` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `bathrooms` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "idNumber" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "marketRent",
DROP COLUMN "numberOfBathrooms",
DROP COLUMN "numberOfBedrooms",
DROP COLUMN "occupied",
DROP COLUMN "tenantId",
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "rent" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE SET NULL ON UPDATE CASCADE;
