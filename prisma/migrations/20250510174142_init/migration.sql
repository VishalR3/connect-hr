/*
  Warnings:

  - Added the required column `monthlyCompensation` to the `SalaryStructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyCompensation` to the `SalaryStructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalaryStructure" ADD COLUMN     "monthlyCompensation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yearlyCompensation" DOUBLE PRECISION NOT NULL;
