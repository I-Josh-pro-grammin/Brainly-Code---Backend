/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, CreateLessonProgressDto } from './dto';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }

  @Get()
  getLessons() {
    return this.lessonService.getLessons();
  }

  @Get('more/:miniModuleId')
  getLessonPerMiniModule(@Param('miniModuleId') miniModuleId: string) {
    return this.lessonService.getLessonsPerMiniModule(miniModuleId)
  } 

  @Get('/:id')
  getLessonById(@Param('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Post('/progress')
  createLessonProgress(@Body() dto: CreateLessonProgressDto) {
    return this.lessonService.createLessonProgress(dto);
  }

  @Patch('/progress/:id')
  incrementUserCourseProgress(@Param('id') id: number, @Body() userId: number ) {
    return this.lessonService.trackLessonProgress(id, userId );
  }
}
