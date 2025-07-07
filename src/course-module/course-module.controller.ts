/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModuleService } from './course-module.service';
import { CreateCourseModuleDto } from './dto';

@Controller('modules')
export class ModuleController {
  constructor(private moduleService: ModuleService){}
  
  @Post()
  createModule(@Body() dto: CreateCourseModuleDto) {
    return this.moduleService.createModule(dto);
  }

  @Get()
  getModules() {
    return this.moduleService.getModules();
  }
}
