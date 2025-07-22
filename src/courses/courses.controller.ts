/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCourseDto } from "./dto";
import { CoursesService } from "./courses.service";
import { JwtGuard } from "src/guard";

@Controller('courses')
export class CoursesController{
  constructor (private coursesService: CoursesService) {}
  
  @UseGuards(JwtGuard)
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