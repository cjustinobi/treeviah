import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Quiz')
export class CreateQuizInput {
  @Field()
  title: string

}
