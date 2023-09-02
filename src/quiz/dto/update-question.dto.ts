

import { IsString, IsOptional, IsArray, IsInt } from 'class-validator'

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  text?: string

  @IsOptional()
  @IsString()
  mediaUrl?: string

  @IsOptional()
  @IsString()
  format?: string

  @IsOptional()
  @IsArray()
  options?: string[]

  @IsOptional()
  @IsArray()
  correctAnswers?: string[]

  @IsOptional()
  @IsInt()
  timer?: number
}
