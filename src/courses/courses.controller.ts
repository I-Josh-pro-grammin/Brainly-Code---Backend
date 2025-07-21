/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCourseDto } from "./dto";
import { CoursesService } from "./courses.service";

@Controller('courses')
export class CoursesController{
  constructor (private coursesService: CoursesService) {}
  
  @Post('create')
  createCourse(@Body() dto: CreateCourseDto ) {
    return this.coursesService.createCourse(dto)
  }

  @Get('')
  getCourses() {
    return this.coursesService.getCourse();
  }

  //To get Course by ID ('...:3000/courses/{id}')
  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Patch('/:courseId')
  likeCourse(@Param('courseId') courseId: string) {
    return this.coursesService.likeCourse(courseId);
  }
}