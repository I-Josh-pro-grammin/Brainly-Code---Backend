/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseModuleDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async createModule(dto: CreateCourseModuleDto) {
    try {
      const courseId = dto.courseId;

      // 1. Get the highest module number for this course
      const lastModule = await this.prisma.courseModule.findFirst({
        where: { courseId },
        orderBy: { number: 'desc' },
      });

      // 2. Get the highest video number for this course
      const lastVideo = await this.prisma.video.findFirst({
        where: { courseId },
        orderBy: { number: 'desc' },
      });

      // 3. Determine the next number
      const lastModuleNumber = lastModule?.number || 0;
      const lastVideoNumber = lastVideo?.number || 0;
      const nextNumber = Math.max(lastModuleNumber, lastVideoNumber) + 1;

      // 4. Create new module with incremented number
      const courseModule = await this.prisma.courseModule.create({
        data: {
          courseId,
          title: dto.title,
          number: nextNumber,
        },
      });

      return courseModule;

    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async getModules() {
    return await this.prisma.courseModule.findMany();
  }

  async getModulesPerCourse(courseId: string) {
    const cId = Number(courseId);
    if (isNaN(cId)) {
      return "CourseId is not a number";
    }

    const modulesPerCourse = await this.prisma.courseModule.findMany({
      where: {
        courseId: cId,
      },
      include: {
        miniModules: true,
      },
    });

    if (!modulesPerCourse || modulesPerCourse.length === 0) {
      return "Modules not found!";
    }

    return modulesPerCourse;
  }
}
