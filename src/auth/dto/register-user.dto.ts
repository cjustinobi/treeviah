
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'

export class RegisterUserDto {

  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public fullname: string

  @IsString()
  @IsNotEmpty()
  public username: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string

  @IsString()
  @IsOptional()
  public salt: string

  @IsString()
  @IsNotEmpty()
  public password: string
}