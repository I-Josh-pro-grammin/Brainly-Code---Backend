/*
  Warnings:

  - You are about to drop the column `content` on the `CourseModule` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `CourseModule` table. All the data in the column will be lost.
  - Added the required column `number` to the `CourseModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseModule" DROP COLUMN "content",
DROP COLUMN "order",
ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MiniModule" (
    "id" SERIAL NOT NULL,
    "courseModuleId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "MiniModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "explaination" TEXT NOT NULL,
    "more" TEXT,
    "example" TEXT,
    "note" TEXT,
    "assignment" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "miniModuleId" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MiniModule" ADD CONSTRAINT "MiniModule_courseModuleId_fkey" FOREIGN KEY ("courseModuleId") REFERENCES "CourseModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_miniModuleId_fkey" FOREIGN KEY ("miniModuleId") REFERENCES "MiniModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
