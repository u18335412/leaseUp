/*
  Warnings:

  - Made the column `propertyOwnerId` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_propertyOwnerId_fkey";

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "propertyOwnerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyOwnerId_fkey" FOREIGN KEY ("propertyOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
