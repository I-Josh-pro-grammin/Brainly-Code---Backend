/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseModuleDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async createModule(dto: CreateCourseModuleDto) {
    try {
      // Step 1: Get the highest current module number for the courseId
      const lastModule = await this.prisma.courseModule.findFirst({
        where: { courseId: dto.courseId },
        orderBy: { number: 'desc' },
      });

      const nextNumber = (lastModule?.number || 0) + 1;

      // Step 2: Create new module with incremented number
      const courseModule = await this.prisma.courseModule.create({
        data: {
          courseId: dto.courseId,
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
