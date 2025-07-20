/* eslint-disable prettier/prettier */
import { extname, resolve } from 'path';
import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfileImageService } from './profile-image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('profile-image')
export class ProfileImageController {
  constructor(private profileImageService: ProfileImageService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', '..', 'uploads', 'profile-images' ),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only JPEG and PNG images are allowed'), false);
        }
      },
    }),
  )
    uploadProfileImage( @Param('id') userId: string, @UploadedFile() file: Express.Multer.File,
  ){
    console.log('Uploaded File:', file); // 👈 ADD THIS
    const imagePath = file ? `${file.filename}` : undefined;
    console.log('Image Path:', imagePath); // 👈 You said this is undefined
    return this.profileImageService.uploadProfileImage(userId, file);
  }

  @Get(':id')
  getProfileImage( @Param('id') id: string ){
    return this.profileImageService.getProfileImage(id);
  }

}
