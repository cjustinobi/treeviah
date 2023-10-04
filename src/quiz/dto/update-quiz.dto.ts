
import { IsString, IsOptional } from 'class-validator';

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  status?: string
}
