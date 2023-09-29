import { ObjectType, Field, InputType } from '@nestjs/graphql'

@InputType()
@ObjectType('Register')
export class UserRegisterInput {

  @Field()
  fullname: string

  @Field()
  email: string

  @Field()
  username: string

  @Field({ nullable: true })
  salt: string

  @Field()
  password: string
}