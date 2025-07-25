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
}
