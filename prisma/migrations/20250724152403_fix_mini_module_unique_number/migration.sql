/*
  Warnings:

  - A unique constraint covering the columns `[courseModuleId,number]` on the table `MiniModule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MiniModule_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "MiniModule_courseModuleId_number_key" ON "MiniModule"("courseModuleId", "number");
