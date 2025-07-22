import { Module } from '@nestjs/common';
import { ProfileImageController } from './profile-image.controller';
import { ProfileImageService } from './profile-image.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], 
  controllers: [ProfileImageController],
  providers: [ProfileImageService]
})
export class ProfileImageModule {}
