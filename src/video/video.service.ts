import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; 
import { CreateVideoDto } from './dto';

@Injectable()
export class VideoService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createVideoDto: CreateVideoDto, file: Express.Multer.File) {
    const url = await this.cloudinaryService.uploadVideo(file);

    return this.prisma.video.create({
      data: {
        title: createVideoDto.title,
        number: createVideoDto.number,
        courseId: createVideoDto.courseId,
        url,
      },
    });
  }

  async findAll() {
    return this.prisma.video.findMany({
      include: { course: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.video.findUnique({
      where: { id },
      include: { course: true },
    });
  }

  async remove(id: number) {
    return this.prisma.video.delete({
      where: { id },
    });
  }
}
