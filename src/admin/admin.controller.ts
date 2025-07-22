/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/guard';

@Controller('admin')
export class AdminController {
  constructor(private adminServices:  AdminService) {}
  @UseGuards(JwtGuard)
  @Get('stats')
  getDashboardStats() {
    return this.adminServices.getDashboardStats();
  }
}
