/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
      timeout: 1200000,
    });
  }

  async uploadVideo(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result: any) => {
          if (error) return reject(error);
          if (!result || !result.secure_url) {
            return reject(new Error('Upload failed or no URL returned'));
          }
          resolve(result.secure_url);
        },
      ).end(file.buffer);
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'profile-images', resource_type: 'image' },
        (error, result: any) => {
          if (error) return reject(error);
          if (!result || !result.secure_url) {
            return reject(new Error('Upload failed or no URL returned'));
          }
          resolve(result.secure_url);
        },
      ).end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve();
        },
      );
    });
  }

  getPublicIdFromUrl(imageUrl: string): string | null {
    try {
      const parts = imageUrl.split('/');
      const filename = parts.pop(); // e.g. 'abcd1234.jpg'
      if (!filename) return null;

      const [publicId] = filename.split('.'); // Remove extension
      const folder = parts.slice(-1)[0]; // e.g. 'profile-images'
      return `${folder}/${publicId}`;
    } catch (err) {
      console.error('Failed to extract publicId from URL:', err);
      return null;
    }
  }
}
