/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCourseDto } from "./dto";
import { CoursesService } from "./courses.service";

@Controller('courses')
export class CoursesController{
  constructor (private course: CoursesService) {}
  
  @Post('create')
  createCourse(@Body() dto: CreateCourseDto ) {
    return this.course.createCourse(dto)
  }

  @Get('')
  getCourses() {
    return this.course.getCourse();
  }

  //To get Course by ID ('...:3000/courses/{id}')
  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.course.getCourseById(id);
  }
}