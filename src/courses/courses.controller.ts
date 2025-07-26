/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete, // ✅ Add this
  BadRequestException, // ✅ Also needed
} from "@nestjs/common";

import { CreateCourseDto } from "./dto";
import { CoursesService } from "./courses.service";
import { JwtGuard } from "src/guard";
import { GetUser } from "src/decorator";

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createCourse(
    @Body() dto: CreateCourseDto,
    @GetUser('id') userId: number,
  ) {
    return this.coursesService.createCourse(dto, userId);
  }

  @Get('')
  getCourses() {
    return this.coursesService.getCourse();
  }

  @UseGuards(JwtGuard)
  @Get('my-courses')
  getMyCourses(@GetUser('id') userId: number) {
    return this.coursesService.getCoursesByCreator(userId);
  }

  @Get('/:id')
  getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    const courseId = parseInt(id);
    if (isNaN(courseId)) throw new BadRequestException('Invalid course ID');
    return this.coursesService.deleteCourse(courseId); 
  }

  @Patch('/:courseId')
  likeCourse(@Param('courseId') courseId: string) {
    return this.coursesService.likeCourse(courseId);
  }
}
