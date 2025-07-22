-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_courseId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "courseId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
