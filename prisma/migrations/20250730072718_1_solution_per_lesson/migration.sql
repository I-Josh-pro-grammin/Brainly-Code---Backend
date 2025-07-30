/*
  Warnings:

  - You are about to drop the column `number` on the `LessonSolution` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId]` on the table `LessonSolution` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LessonSolution_number_key";

-- AlterTable
ALTER TABLE "LessonSolution" DROP COLUMN "number";

-- CreateIndex
CREATE UNIQUE INDEX "LessonSolution_lessonId_key" ON "LessonSolution"("lessonId");
