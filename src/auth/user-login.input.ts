import { ObjectType, Field, InputType, ID } from '@nestjs/graphql'
import { UserResponseDto } from './dto/user-response.dto'

@InputType()
@ObjectType('Login')
export class UserLoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class AccessToken {

  @Field()
  accessToken: string 

 @Field(() => UserResponseDto, { nullable: true })
  user?: UserResponseDto
}