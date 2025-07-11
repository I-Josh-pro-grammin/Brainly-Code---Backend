import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateLessonVideoDto } from './dto';

@Injectable()
export class LessonVideoService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createLessonVideoDto: CreateLessonVideoDto, file: Express.Multer.File) {
    const url = await this.cloudinary.uploadVideo(file);

    return this.prisma.lessonVideo.create({
      data: {
        title: createLessonVideoDto.title,
        number: createLessonVideoDto.number,
        miniModuleId: createLessonVideoDto.miniModuleId,
        url,
      },
    });
  }

  async findAll() {
    return this.prisma.lessonVideo.findMany({ include: { miniModule: true } });
  }

  async findByMiniModule(miniModuleId: number) {
    return this.prisma.lessonVideo.findMany({
      where: { miniModuleId },
    });
  }

  async findById(id: number) {
  return this.prisma.lessonVideo.findUnique({
    where: { id },
    include: { miniModule: true }, // optional, if you want related info
  });
}


  async remove(id: number) {
    return this.prisma.lessonVideo.delete({ where: { id } });
  }
}
