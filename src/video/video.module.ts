import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [CloudinaryModule, PrismaModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}