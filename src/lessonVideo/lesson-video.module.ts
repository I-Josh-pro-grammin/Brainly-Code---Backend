import { Module } from '@nestjs/common';
import { LessonVideoService } from './lesson-video.service';
import { LessonVideoController } from './lesson-video.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [LessonVideoController],
  providers: [LessonVideoService, PrismaService, CloudinaryService],
})
export class LessonVideoModule {}
