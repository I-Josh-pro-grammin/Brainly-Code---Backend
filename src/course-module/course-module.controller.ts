/* eslint-disable prettier/prettier */
import { Body, Controller } from '@nestjs/common';
import { ModuleService } from './course-module.service';
import { CreateCourseModuleDto } from './dto';

@Controller('module')
export class ModuleController {
  constructor(private moduleService: ModuleService){}
  
  createModule(@Body() dto: CreateCourseModuleDto) {
    return this.moduleService.createModule(dto);
  }
}
