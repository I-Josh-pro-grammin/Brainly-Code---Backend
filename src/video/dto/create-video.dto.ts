/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @Type(() => Number) // ✅ this is key
  courseId!: number;
}