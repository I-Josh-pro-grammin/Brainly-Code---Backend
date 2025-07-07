/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseModuleDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService){}
  async createModule(dto: CreateCourseModuleDto ) {

    try {

      const isCourseModuleExists = await this.prisma.courseModule.findFirst({
        where: {
          courseId: dto.courseId,
        }
      })

      if(isCourseModuleExists){
        return "The course-module already exists";
      }

      const courseModule = await this.prisma.courseModule.create({
        data: dto
      })
  
      return courseModule;
    } catch (error) {
      console.log(error);
      return error;
    } 
  }

  async getModules() {
    return await this.prisma.courseModule.findMany();
  }
}

