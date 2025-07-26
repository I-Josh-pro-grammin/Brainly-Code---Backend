/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async createCourse(dto: CreateCourseDto, creatorId: number) {
    try {
    const course = await this.prisma.course.create({
      data: {
        ...dto,
        creator: {
          connect: { id: creatorId },
        },
      },
      select: {
        id: true,
        title: true,
        category: true,
        creatorId: true,
        createdAt: true,
      },
    });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Course already exists");
        }
      }
      throw error;
    }
  }

    async getCoursesByCreator(creatorId: number) {
      console.log(creatorId)
    return this.prisma.course.findMany({
      where: {
        creatorId,
      },
      orderBy: {
        createdAt: 'desc', // optional: latest first
      },
      select: {
        id: true,
        title: true,
        category: true,
        createdAt: true,
        description: true,
        duration: true,
        studentsCount: true,
        rating: true,
        level: true,
        likes:true,
        completions: true
        // include other fields if needed
      },
    });
  }

  async getCourseById(courseId: string) {
    const cId = Number(courseId);
    if (isNaN(cId)) {
      throw new Error("courseId is not a valid number");
    }

    const course = await this.prisma.course.findUnique({
      where: { id: cId },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  }

  async getCourse() {
    return this.prisma.course.findMany();
  }

  async likeCourse(id: string) {
    const courseId = Number(id);
    if (isNaN(courseId)) {
      throw new Error("The courseId you provided is not a number");
    }

    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async deleteCourse(courseId: number) {
  const course = await this.prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          miniModules: {
            include: {
              lessons: {
                include: {
                  solutions: true,
                },
              },
              lessonVideos: true,
            },
          },
        },
      },
      videos: true,
      progress: true,
      ratings: true,
    },
  });

  if (!course) throw new Error("Course not found");

  // Delete LessonSolutions
  for (const module of course.modules) {
    for (const miniModule of module.miniModules) {
      for (const lesson of miniModule.lessons) {
        await this.prisma.lessonSolution.deleteMany({
          where: { lessonId: lesson.id },
        });
      }
    }
  }

  // Delete Lessons
  for (const module of course.modules) {
    for (const miniModule of module.miniModules) {
      await this.prisma.lesson.deleteMany({
        where: { miniModuleId: miniModule.id },
      });
    }
  }

  // Delete LessonVideos
  for (const module of course.modules) {
    for (const miniModule of module.miniModules) {
      await this.prisma.lessonVideo.deleteMany({
        where: { miniModuleId: miniModule.id },
      });
    }
  }

  // Delete MiniModules
  for (const module of course.modules) {
    await this.prisma.miniModule.deleteMany({
      where: { courseModuleId: module.id },
    });
  }

  // Delete CourseModules
  await this.prisma.courseModule.deleteMany({
    where: { courseId: course.id },
  });

  // Delete Videos
  await this.prisma.video.deleteMany({
    where: { courseId: course.id },
  });

  // Delete Ratings
  await this.prisma.courseRating.deleteMany({
    where: { courseId: course.id },
  });

  // Delete Progress
  await this.prisma.userCourseProgress.deleteMany({
    where: { courseId: course.id },
  });

  // Finally, delete the course
  await this.prisma.course.delete({
    where: { id: course.id },
  });

  return { message: "Course and all related data deleted successfully." };
}

}
