/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async createLesson(dto: CreateLessonDto) {
    try {
      const lessonExists = await this.prisma.lesson.findUnique({
        where: {
          number: dto.number
        }
      })

      if(lessonExists){
        return "Lesson with this number already exists";
      }

      const lesson = await this.prisma.lesson.create({
        data: dto
      })

      return lesson;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async getLessonsPerMiniModule(miniModuleId: string) {
    try {
      const mMID = Number(miniModuleId);

      if(isNaN(mMID)){
        return "The minimoduleid provided is not a number";
      }
  
      const lessonsPerMiniModule = await this.prisma.lesson.findMany({
        where: {
          miniModuleId: mMID,
        }
      })
  
      return lessonsPerMiniModule;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getLessons() {
    try {
      const lessons = await this.prisma.lesson.findMany();

      return lessons;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getLessonById(id: string) {
    try {
      const lessonId = Number(id);

      if(isNaN(lessonId)){
        return "The lessonId provided is not a number";
      }

      const lesson = await this.prisma.lesson.findUnique({
        where: {
          id: lessonId,
        }
      })

      return lesson;
    } catch (error) {
      console.log(error)
      return error;
    }
  }
}
