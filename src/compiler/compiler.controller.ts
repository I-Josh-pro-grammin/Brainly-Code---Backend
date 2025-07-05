/* eslint-disable prettier/prettier */
// src/compiler/compiler.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CompilerService } from './compiler.service';

@Controller('compiler')
export class CompilerController {
  constructor(private readonly compilerService: CompilerService) {}

  @Post('run')
  runCode(@Body() body: { code: string; languageId: number }) {
    return this.compilerService.compileCode(body.code, body.languageId);
  }
}

