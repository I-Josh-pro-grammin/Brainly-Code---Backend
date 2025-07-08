/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }
}
