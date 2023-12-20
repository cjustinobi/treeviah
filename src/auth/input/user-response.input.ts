import { Field, ObjectType } from '@nestjs/graphql'
import { IsString, IsEmail, IsInt } from 'class-validator'

@ObjectType()
export class UserResponseInput {
  @Field()
  @IsInt()
  public id: number

  @Field()
  @IsString()
  public fullname: string

  @Field()
  @IsString()
  public username: string

  @Field()
  @IsString()
  @IsEmail()
  public email: string
}
