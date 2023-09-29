import { ObjectType, Field, InputType, ID } from '@nestjs/graphql'
import { UserResponseInput } from '../input/user-response.input'

@InputType()
@ObjectType('Login')
export class UserLoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {

  @Field()
  accessToken: string 

 @Field(() => UserResponseInput, { nullable: true })
  user?: UserResponseInput
}