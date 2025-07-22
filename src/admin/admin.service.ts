/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
