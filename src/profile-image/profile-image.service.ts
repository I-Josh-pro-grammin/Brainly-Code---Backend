import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class ProfileImageService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadProfileImage(id: string, image: Express.Multer.File) {
    const userId = Number(id);
    if (isNaN(userId)) throw new Error('Your id was not a number');

    try {
      // 1. Check existing profile image
      const existingRecord = await this.prisma.userProfileImage.findUnique({
        where: { userId },
      });

      // 2. If it exists, delete from Cloudinary
      if (existingRecord?.path) {
        const publicId = this.cloudinary.getPublicIdFromUrl(existingRecord.path);
        if (publicId) {
          await this.cloudinary.deleteImage(publicId);
        }
      }

      // 3. Upload new image
      const imageUrl = await this.cloudinary.uploadImage(image);

      // 4. Upsert new image record
      const updatedRecord = await this.prisma.userProfileImage.upsert({
        where: { userId },
        update: { path: imageUrl },
        create: { userId, path: imageUrl },
      });

      return updatedRecord;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async getProfileImage(id: string) {
    const userId = Number(id);
    if (isNaN(userId)) throw new Error('Your id was not a number');

    // Just fetch and return the profile image record
    return await this.prisma.userProfileImage.findUnique({
      where: { userId },
    });
  }
}
