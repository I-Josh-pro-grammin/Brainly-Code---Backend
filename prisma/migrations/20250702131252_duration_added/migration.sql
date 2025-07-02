/*
  Warnings:

  - Added the required column `duration` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "relation" TEXT;
