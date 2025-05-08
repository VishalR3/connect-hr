-- CreateEnum
CREATE TYPE "PayComponentCalculationType" AS ENUM ('fixed', 'percentage', 'formula');

-- CreateEnum
CREATE TYPE "PayComponentCategory" AS ENUM ('earning', 'deduction', 'reimbursement');

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentDepartmentId" INTEGER,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryStructure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SalaryStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayComponent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PayComponentCategory" NOT NULL DEFAULT 'earning',
    "calculationType" "PayComponentCalculationType" NOT NULL DEFAULT 'fixed',
    "amount" DOUBLE PRECISION NOT NULL,
    "formula" TEXT,
    "baseComponentId" INTEGER,
    "isStatutory" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PayComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructureComponent" (
    "id" SERIAL NOT NULL,
    "salaryStructureId" INTEGER NOT NULL,
    "payComponentId" INTEGER NOT NULL,
    "amount_override" DOUBLE PRECISION,
    "percent_override" DOUBLE PRECISION,
    "formula_override" TEXT,

    CONSTRAINT "StructureComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeSalaryStructure" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "salaryStructureId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeSalaryStructure_pkey" PRIMARY KEY ("id")
);
