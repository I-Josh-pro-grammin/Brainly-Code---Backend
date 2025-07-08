/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `CourseModule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `MiniModule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseModule_number_key" ON "CourseModule"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_number_key" ON "Lesson"("number");

-- CreateIndex
CREATE UNIQUE INDEX "MiniModule_number_key" ON "MiniModule"("number");
