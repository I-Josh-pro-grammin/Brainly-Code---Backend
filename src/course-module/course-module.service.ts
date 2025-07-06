/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseModuleDto } from './dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService){}
  async createModule(dto: CreateCourseModuleDto ) {
    
    try {
      const courseModule = await this.prisma.courseModule.create({
        data: dto
      })
      
      const isCourseModuleExists = await this.prisma.courseModule.findFirst({
        where: {
          id: courseModule.id,
        }
      })

      if(isCourseModuleExists){
        throw new Error("Course already exists");
      }
      return "Course Module created successfully";
    } catch (error) {
      console.log(error);
      return error;
    } 
  }
}

