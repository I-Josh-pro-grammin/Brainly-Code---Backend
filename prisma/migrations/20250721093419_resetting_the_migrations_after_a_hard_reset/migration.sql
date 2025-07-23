/*
  Warnings:

  - You are about to drop the column `uploaderId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "uploaderId";
