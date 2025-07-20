/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChallengeInstructionsService } from './challenge-instructions.service';
import { createChallengeInstructionDto } from './dto';

@Controller('challenge-instructions')
export class ChallengeInstructionsController {
  constructor(private challengeInstructionsService: ChallengeInstructionsService) {}

  @Post('')
  createChallengeInstruction (@Body() dto: createChallengeInstructionDto ) {
    return this.challengeInstructionsService.createChallengeInstruction(dto);
  }

  @Get(':challengeId')
  getInstructionsForChallenge(@Param('challengeId') challengeId: string) {
    return this.challengeInstructionsService.getInstructionsForChallenge(challengeId);
  }
}
