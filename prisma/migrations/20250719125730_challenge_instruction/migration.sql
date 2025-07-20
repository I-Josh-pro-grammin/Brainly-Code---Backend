-- CreateTable
CREATE TABLE "LessonSolution" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "LessonSolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeInstructions" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "ChallengeInstructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeSolutions" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "ChallengeSolutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonSolution_number_key" ON "LessonSolution"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeSolutions_number_key" ON "ChallengeSolutions"("number");

-- AddForeignKey
ALTER TABLE "LessonSolution" ADD CONSTRAINT "LessonSolution_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeInstructions" ADD CONSTRAINT "ChallengeInstructions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeSolutions" ADD CONSTRAINT "ChallengeSolutions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
