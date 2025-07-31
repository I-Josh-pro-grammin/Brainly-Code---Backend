/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common"; // Import NotFoundException
import { PrismaService } from "src/prisma/prisma.service";
import { GetUser } from "src/decorator";
import { User } from "generated/prisma";
import { EditUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getMe(@GetUser() user: User) {
    //return the user from the payload
    return user; // Return only plain values;
  }

  async getCurrentUser(id: string) {
    const userId = Number(id);

    if (isNaN(userId)) {
      return "The id you provided is not a number"; // Consider throwing a BadRequestException here
    }

    const currentUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      throw new NotFoundException("User not found"); // Throw NestJS exception for consistency
    }

    return currentUser;
  }

  async editUser(userId: number, dto: EditUserDto) {
    const previousUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!previousUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isPremium:
          dto.isPremium !== undefined ? dto.isPremium : previousUser?.isPremium,
        email: dto.email || previousUser?.email,
        username: dto.username || previousUser?.username,
      },
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isPremium: user.isPremium,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async upgradeUserToPro(userId: number) {
    const userToUpgrade = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        isPremium: true,
      },
    });

    if (!userToUpgrade) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isPremium: true,
      },
      select: {
        isPremium: true,
      },
    });

    return updatedUser;
  }
}
