/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/createChallenge.dto';
import { JwtGuard } from 'src/guard';

@Controller('challenges')
export class ChallengesController {
  constructor( private challengeService: ChallengesService ){}
  
  @UseGuards(JwtGuard)
  @Post()
  createChallenge(@Body() dto: CreateChallengeDto) {
    return this.challengeService.createChallenge(dto);
  }
  
  @Post('like/:id')
  incrementLikes(@Param('id') id: string) {
    return this.challengeService.incrementLikes(id);
  }

  @Get('')
  getChallenges() {
    return this.challengeService.getChallenges();
  }

  @Get('/:id')
  getChallengeById(@Param('id') id: string){
    return this.challengeService.getChallengeById(id);
  }
}
