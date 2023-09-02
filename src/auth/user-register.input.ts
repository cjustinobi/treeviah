import { ObjectType, Field, InputType } from '@nestjs/graphql'

@InputType()
@ObjectType('Register')
export class UserRegisterInput {

  @Field()
  first_name: string

  @Field()
  last_name: string

  @Field()
  email: string

  @Field()
  username: string

  @Field()
  salt: string

  @Field()
  password: string
}