import { ObjectType, Field, InputType, ID } from '@nestjs/graphql'

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
}