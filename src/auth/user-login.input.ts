import { ObjectType, Field, InputType, ID } from '@nestjs/graphql'

@InputType()
@ObjectType('Login')
export class UserLoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

// TODO: Remove when i have a query elsewhere
@ObjectType()
export class SampleInput {

  @Field()
  test: string 
}


@ObjectType()
export class AccessToken {

  @Field()
  accessToken: string 
}