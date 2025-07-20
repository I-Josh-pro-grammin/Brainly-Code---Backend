/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createChallengeInstructionDto } from './dto';

@Injectable()
export class ChallengeInstructionsService {
  constructor(private prisma: PrismaService) {}

  async createChallengeInstruction( dto: createChallengeInstructionDto ) {
    return this.prisma.challengeInstructions.create({
      data: {
        challengeId: dto.challengeId,
        number: dto.number,
        instruction: dto.instruction
      }
    })
  }

  async getInstructionsForChallenge( id: string ) {
    const challengeId = Number(id);

    if(isNaN(challengeId)){
      return "challengeid is not a number";
    }

    try {
      const challengeInstructions = await this.prisma.challengeInstructions.findMany({
        where: {
          challengeId: challengeId,
        }
      })

      return challengeInstructions;
    } catch (error) {
      console.log(error)
      return "Instructions not found";
    }
  }
}
