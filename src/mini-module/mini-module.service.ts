/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMiniModuleDto } from './dto';

@Injectable()
export class MiniModuleService {
  constructor(private prisma: PrismaService) {}

    async createMiniModule(dto: CreateMiniModuleDto) {
    try {
      // 1. Get the highest number for miniModules under the same courseModuleId
      const lastMiniModule = await this.prisma.miniModule.findFirst({
        where: {
          courseModuleId: dto.courseModuleId,
        },
        orderBy: {
          number: 'desc',
        },
      });

      // 2. Auto-increment number
      const nextNumber = lastMiniModule ? lastMiniModule.number + 1 : 1;

      // 3. Create the miniModule with the auto-incremented number
      const miniModule = await this.prisma.miniModule.create({
        data: {
          courseModuleId: dto.courseModuleId,
          title: dto.title,
          number: nextNumber,
        },
      });

      return miniModule;
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  async getMiniModulesPerCourseModule(courseModuleId: string) {
    const cMID = Number(courseModuleId);

    if(isNaN(cMID)) {
      return "Invalid courseID";
    }

    const miniModulesPerCourseModule = await this.prisma.miniModule.findMany({
      where: {
        courseModuleId: cMID
      },
      include: {
        lessons: true,
      }
    })

    if(!miniModulesPerCourseModule) {
      return "MiniModules not found";
    }

    return miniModulesPerCourseModule;
  }
}
