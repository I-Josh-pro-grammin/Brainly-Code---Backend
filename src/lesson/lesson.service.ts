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
}
