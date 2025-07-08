/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMiniModuleDto } from './dto';

@Injectable()
export class MiniModuleService {
  constructor(private prisma: PrismaService) {}

  async createMiniModule(dto: CreateMiniModuleDto) {
 
    try {
      
      const isMiniModuleExists = await this.prisma.miniModule.findFirst({
        where: {
          number: dto.number,
        }
      })
      if (isMiniModuleExists) {
        return "The mini-module with this Number already exists";
      }

      const miniModule = await this.prisma.miniModule.create({
        data: dto
      });
  
      return miniModule;
    } catch (error) {
      console.log(error)
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
      }
    })

    if(!miniModulesPerCourseModule) {
      return "MiniModules not found";
    }

    return miniModulesPerCourseModule;
  }
}
