/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLessonDto } from './dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

async createLesson(dto: CreateLessonDto) {
  try {
    // 1. Get the highest lesson number under the same miniModuleId
    const lastLesson = await this.prisma.lesson.findFirst({
      where: {
        miniModuleId: dto.miniModuleId,
      },
      orderBy: {
        number: 'desc',
      },
    });

    // 2. Determine the next number
    const nextNumber = lastLesson ? lastLesson.number + 1 : 1;

    // 3. Create the lesson
    const lesson = await this.prisma.lesson.create({
      data: {
        miniModuleId: dto.miniModuleId,
        title: dto.title,
        explanation: dto.explanation,
        more: dto.more,
        example: dto.example,
        note: dto.note,
        assignment: dto.assignment,
        number: nextNumber,
        },
      });

      // 4. Find the Course related to this lesson
      const course = await this.prisma.course.findFirst({
        where: {
          modules: {
            some: {
              miniModules: {
                some: {
                  lessons: {
                    some: {
                      id: lesson.id,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (course) {
        // 5. Count all lessons in this course
        const totalLessons = await this.prisma.lesson.count({
          where: {
            miniModule: {
              courseModule: {
                courseId: course.id,
              },
            },
          },
        });
        const totalLessonsDuration = `${totalLessons}`;

        // 6. Update course duration with the total number of lessons
        await this.prisma.course.update({
          where: { id: course.id },
          data: { duration: totalLessonsDuration },
        });
      }

      return lesson;
    } catch (error) {
      console.error(error);
      throw error;
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
