/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileImageService {
  constructor( private prisma: PrismaService  ){}

  async uploadProfileImage(id: string, image: Express.Multer.File){
    const userId = Number(id);
    const imagePath = image.filename;

    if(isNaN(userId)) {
      return "Your id was not a number";
    }

    try {
      const image = await this.prisma.userProfileImage.create({data: { userId: userId, path: imagePath }});
      
      return image
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getProfileImage(id: string){
    const userId = Number(id);

    if(isNaN(userId)) {
      return "The userId is not a number";
    }

    const userProfileImage = this.prisma.userProfileImage.findUnique({
      where: {
        userId: userId,
      }
    })

    if(!userProfileImage) {
      return "User has no profile image"
    }

    return userProfileImage;
  }
}
