/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto, CreateUserCourseProgressDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
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

    return {
      message: "Course Created successfully",
      course: course,
    }
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

  async getCourses() {
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

  async createUserCourseProgress(dto: CreateUserCourseProgressDto): Promise<{message: string, data: object}> {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    try {
      const userCourseProgress = await this.prisma.userCourseProgress.create({
        data: {
          user: { connect: { id: dto.userId } },
          course: { connect: { id: dto.courseId } },
          currentStep: dto.currentStep ?? 0,
          completed: dto.completed ?? false,
          rating: dto.rating,
        },
      });
      return {
        "message": "The course progress has started being traced",
        data: userCourseProgress,
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Failed to create user course progress');
    }
  }

  async incrementUserCourseProgress(id: number, courseId: number) {
    const courseModules = await this.prisma.courseModule.findMany({
      where: {
        courseId: courseId,
      },
    });
  
    const totalSteps = courseModules.length;
  
    if (totalSteps === 0) {
      throw new Error("This course has no modules.");
    }
  
    const courseProgress = await this.prisma.userCourseProgress.findUnique({
      where: { id: id },
    });
  
    if (!courseProgress) {
      throw new Error("Progress not found.");
    }
  
    let nextStep = courseProgress.currentStep + 1;
  
    if (nextStep > totalSteps) {
      nextStep = totalSteps;
    }
  
    const percent = Math.round((nextStep / totalSteps) * 100);
  
    await this.prisma.userCourseProgress.update({
      where: { id: id },
      data: {
        currentStep: nextStep,
      },
    });
  
    if (percent === 100) {
      await this.prisma.userCourseProgress.update({
        where: {
          id: id,
        }, 
        data: {
          completed: true,
        }
      })
      return {
        message: "Course complete",
        percentComplete: percent,
        step: nextStep,
        totalSteps: totalSteps,
      };
    }
  
    return {
      message: "New step started",
      percentComplete: percent,
      step: nextStep,
      totalSteps: totalSteps,
    };
  }
  
  
}
