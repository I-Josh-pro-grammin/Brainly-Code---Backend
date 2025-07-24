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

async create(
  createLessonVideoDto: CreateLessonVideoDto,
  file: Express.Multer.File
) {
  try {
    const { miniModuleId, title } = createLessonVideoDto;

    // Upload video to Cloudinary
    const url = await this.cloudinary.uploadVideo(file);

    // Find highest lesson number under this miniModule
    const latestLesson = await this.prisma.lesson.findFirst({
      where: { miniModuleId },
      orderBy: { number: 'desc' },
    });

    // Find highest lessonVideo number under this miniModule
    const latestVideo = await this.prisma.lessonVideo.findFirst({
      where: { miniModuleId },
      orderBy: { number: 'desc' },
    });

    const highestLessonNumber = latestLesson?.number || 0;
    const highestVideoNumber = latestVideo?.number || 0;

      const nextNumber = Math.max(highestLessonNumber, highestVideoNumber) + 1;

      // Create the lesson video
      return await this.prisma.lessonVideo.create({
        data: {
          title,
          number: nextNumber,
          miniModuleId,
          url,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
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
