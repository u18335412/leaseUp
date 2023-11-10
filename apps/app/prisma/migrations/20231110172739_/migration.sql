-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_leaseId_fkey";

-- CreateTable
CREATE TABLE "_LeaseToUnit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LeaseToUnit_AB_unique" ON "_LeaseToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_LeaseToUnit_B_index" ON "_LeaseToUnit"("B");

-- AddForeignKey
ALTER TABLE "_LeaseToUnit" ADD CONSTRAINT "_LeaseToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Lease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaseToUnit" ADD CONSTRAINT "_LeaseToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
