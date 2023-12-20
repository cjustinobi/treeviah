import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('UpdateQuiz')
export class UpdateQuizInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  status?: string
}
