/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditUserDto, } from "./dto";
import { GetUser } from "src/decorator";
import { User } from "generated/prisma";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  getMe(@GetUser() user: User){
        //return the user from the payload
        return user; // Return only plain values;
  }

  async  getCurrentUser(id: string) {
   
    const userId = Number(id);

    if(isNaN(userId)) {
      return "The id you provided is not a number";
    }

    return await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    })
  }

  async editUser(userId: number, dto: EditUserDto) {
      console.log('User ID:', userId);
  console.log('DTO received:', dto);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isPremium: dto.isPremium,
        email: dto.email,
        username: dto.username,
        
      },
    });
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isPremium: user.isPremium,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
  }
}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async deleteUser(id: string) {

    const userId = Number(id);
    const user = await this.prisma.user.delete({
      where: {
        id: userId,
      }
    })

    return user
  }

}
