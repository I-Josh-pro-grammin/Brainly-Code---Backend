/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const courses = await this.prisma.course.findMany();
    const courseNumber = courses.length;

    const students = await this.prisma.user.findMany({
      where: {
        role: "USER",
      }
    })
    const studentCount = students.length;

    const challenges = await this.prisma.challenge.findMany();
    const challengeCount = challenges.length;
    
    const premium = await this.prisma.user.findMany({
      where: {
        isPremium: true,
      }
    })
    const premiumCount = premium.length

    return {courseNumber, studentCount, challengeCount, premiumCount};
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async deleteUser(id: string) {

    const userId = Number(id);

    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        }
      })
  
      return {message: "User Deleted successfully"};
    } catch (error) {
      console.log(error)
      throw new HttpException("Unable to delete User", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUser(userId: number, dto: EditUserDto) {
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

  async createLessonSolution(dto: {lessonId: number, solution: string}) {
    try {
      await this.prisma.lessonSolution.create({
        data: dto
      });

      return {message: "Solution created Successfully"};
    } catch (error) {
      console.log(error);
      throw new HttpException("INTERNAL SERVER ERROR:", HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }

}
