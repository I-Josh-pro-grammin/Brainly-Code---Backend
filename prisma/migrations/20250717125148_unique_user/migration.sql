/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserProfileImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProfileImage_userId_key" ON "UserProfileImage"("userId");
