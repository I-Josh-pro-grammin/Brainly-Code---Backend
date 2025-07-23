/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(private prisma: PrismaService) {}

  async createChallenge( dto : CreateChallengeDto ) {
    try {
      const challenge = await this.prisma.challenge.create({data: dto});
    
      return "Challenge created successfully";
    } catch (error) {
      this.logger.error('Request failed:',error);
      throw new NotFoundException("Challenge not found");
    }
  }


  async incrementLikes(challengeId: string) {
    const cId = Number(challengeId);

    if(isNaN(cId)){
      throw new BadRequestException("Invalid challenge Id, must be a number");
    }

    const challenge = await this.prisma.challenge.findUnique({
      where: { id: cId },
    });
  
    try {
    
      if (!challenge) {
        throw new NotFoundException("Challenge not found");
      }

      const likedChallenge = await this.prisma.challenge.update({
        where: { id: cId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return "Challenge liked successfully";
    } catch (error) {
      this.logger.error('Request failed:',error);
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getChallenges() {
    try {
      const challenges = await this.prisma.challenge.findMany();

      return challenges;
    } catch (error) {
      this.logger.error('Request failed:',error)
      throw new NotFoundException("Unable to get Challenges");
    }
  }

  async getChallengeById(challengeId: string){
    const cId = Number(challengeId)

    if(isNaN(cId)){
      throw new Error ("Invalid challenge Id is not a number");
    }

    try {
      const challenge = await this.prisma.challenge.findUnique({
        where: {
          id: cId
        }
      })
  
      if (!challenge) {
        throw new NotFoundException('Challenge not found');
      }
  
      return challenge;
    } catch (error) {
      this.logger.error('Request failed:',error)
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
}
