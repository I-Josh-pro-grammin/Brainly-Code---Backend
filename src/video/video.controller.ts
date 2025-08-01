/* eslint-disable prettier/prettier */
import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max, adjust as needed
  },
}))
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("UPLOADED FILE:", file);
    return this.videoService.create(createVideoDto, file);
  }

    @Get()
    findByCourse(@Query('courseId') courseId: string) {
      return this.videoService.findByCourseId(Number(courseId));
    }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.remove(id);
  }
}
