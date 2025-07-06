/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChallengesService {
  constructor ( private prisma: PrismaService ){}

  async createChallenge( dto : CreateChallengeDto ) {
    const challenge = await this.prisma.challenge.create({data: dto});
    return challenge;
  }


  async incrementLikes(challengeId: string) {
    const cId = Number(challengeId);

    if(isNaN(cId)){
      throw new Error ("Invalid challenge Id is not a number");
    }

    const challenge = await this.prisma.challenge.findUnique({
      where: { id: cId },
    });
  
    if (!challenge) {
      throw new Error('Challenge not found');
    }
  
    return this.prisma.challenge.update({
      where: { id: cId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async getChallenges() {
    const challenges = await this.prisma.challenge.findMany();

    return challenges;
  }

  async getChallengeById(challengeId: string){
    const cId = Number(challengeId)

    if(isNaN(cId)){
      throw new Error ("Invalid challenge Id is not a number");
    }

    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: cId
      }
    })

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    return challenge;
    
  }
  
}
