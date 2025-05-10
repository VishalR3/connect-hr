/*
  Warnings:

  - You are about to drop the column `createdAt` on the `EmployeeSalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `effectiveFrom` on the `EmployeeSalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `EmployeeSalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `EmployeeSalaryStructure` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SalaryStructure` table. All the data in the column will be lost.
  - Added the required column `effectiveFrom` to the `SalaryStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculatedAmount` to the `StructureComponent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeSalaryStructure" DROP COLUMN "createdAt",
DROP COLUMN "effectiveFrom",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "SalaryStructure" DROP COLUMN "description",
ADD COLUMN     "effectiveFrom" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StructureComponent" ADD COLUMN     "baseComponentId" INTEGER,
ADD COLUMN     "calculatedAmount" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "StructureComponent" ADD CONSTRAINT "StructureComponent_baseComponentId_fkey" FOREIGN KEY ("baseComponentId") REFERENCES "StructureComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
