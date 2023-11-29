/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Lease` table. All the data in the column will be lost.
  - Added the required column `leaseId` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landlordId` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "leaseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lease" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "landlordId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES "Lease"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
