/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MiniModuleService } from './mini-module.service';
import { CreateMiniModuleDto } from './dto';

@Controller('mini-modules')
export class MiniModuleController {
  constructor(private miniModuleService: MiniModuleService) {}

  @Post()
  createMiniModule(@Body() dto: CreateMiniModuleDto) {
    return this.miniModuleService.createMiniModule(dto);
  }

  @Get('/:id')
  getMiniModulePerModule(@Param('id')  id: string) {
    return this.miniModuleService.getMiniModulesPerCourseModule(id);
  }
}
