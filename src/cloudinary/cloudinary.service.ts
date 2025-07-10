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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(result.secure_url);
        },
        ).end(file.buffer);
    });
    }
}