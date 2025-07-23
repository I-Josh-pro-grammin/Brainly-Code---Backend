/*
  Warnings:

  - Made the column `courseId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_courseId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "courseId" SET NOT NULL,
ALTER COLUMN "courseId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
