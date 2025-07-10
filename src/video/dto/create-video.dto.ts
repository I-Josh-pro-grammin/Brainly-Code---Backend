import { IsNotEmpty,IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Type(() => Number)
  @IsNumber()
  number!: number;

  @Type(() => Number)
  @IsNumber()
  courseId!: number;
}