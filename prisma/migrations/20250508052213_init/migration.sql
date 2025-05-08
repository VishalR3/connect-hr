-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
