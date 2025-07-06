/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class CoursesService{
  constructor (private prisma: PrismaService){}

  async createCourse(dto: CreateCourseDto) {
    try {
      const course = await this.prisma.course.create({
        data: dto
      });
  
      console.log(course);
  
      return  course;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === "P2002") {
          throw new ForbiddenException(
            "Course already exists",
          );
        }
      }
      throw error;
    }
  }

  async getCourseById(courseId : string) {
    //turning the courseId to a number
    const cId = Number(courseId);

    if(isNaN(cId)){
      throw new Error("courseId is invalid number");
    }    

    const course = await this.prisma.course.findUnique({
        where: {
          id: cId
        }
      })

      if (!course) {
        throw new Error('Course not found');
      }
    
      return course;
  }

  async getCourse() {
    return await this.prisma.course.findMany();
  }
}