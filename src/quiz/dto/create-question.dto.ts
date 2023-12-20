import { IsString, IsOptional, IsArray, IsInt } from 'class-validator'

export class CreateQuestionDto {
  @IsString()
  text: string

  @IsOptional()
  @IsString()
  mediaUrl?: string

  @IsString()
  format: string

  @IsOptional()
  @IsArray()
  options?: string[]

  @IsOptional()
  @IsArray()
  correctAnswers?: string[]

  @IsOptional()
  multipleAnswers?: boolean

  @IsOptional()
  @IsInt()
  timer?: number

  @IsString()
  point: string

  @IsInt()
  quiz
}
