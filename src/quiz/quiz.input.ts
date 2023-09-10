import { InputType, Field, Int, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Quiz')
export class CreateQuizInput {
  @Field()
  title: string

}
