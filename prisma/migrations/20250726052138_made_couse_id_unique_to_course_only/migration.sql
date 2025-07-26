/*
  Warnings:

  - A unique constraint covering the columns `[courseId,number]` on the table `CourseModule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_courseId_number_key" ON "CourseModule"("courseId", "number");
