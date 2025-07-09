/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto';

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
}
