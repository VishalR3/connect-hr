/*
  Warnings:

  - You are about to drop the column `baseComponentId` on the `StructureComponent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StructureComponent" DROP CONSTRAINT "StructureComponent_baseComponentId_fkey";

-- AlterTable
ALTER TABLE "StructureComponent" DROP COLUMN "baseComponentId";
