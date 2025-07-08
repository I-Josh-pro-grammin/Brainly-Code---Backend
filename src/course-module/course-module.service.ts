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
          number: dto.number,
        }
      })

      if(isCourseModuleExists){
        return "The course-module with this number already exists";
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

  async getModulesPerCourse(courseId: string) {
 
    const cId = Number(courseId);

    if(isNaN(cId)) {
      return "CourseId is not a number"
    }

    const modulesPerCourse = await this.prisma.courseModule.findMany({
      where: {
        courseId: cId,
      }
    })

    if(!modulesPerCourse) {
      return "Modules not found!";
    }

    return modulesPerCourse;
  }
}

