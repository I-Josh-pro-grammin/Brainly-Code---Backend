-- CreateTable
CREATE TABLE "LessonVideo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "miniModuleId" INTEGER NOT NULL,

    CONSTRAINT "LessonVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonVideo_number_key" ON "LessonVideo"("number");

-- AddForeignKey
ALTER TABLE "LessonVideo" ADD CONSTRAINT "LessonVideo_miniModuleId_fkey" FOREIGN KEY ("miniModuleId") REFERENCES "MiniModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
