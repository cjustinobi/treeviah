import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('JoinQuiz')
export class JoinQuizInput {
  @Field()
  quizId: number

  @Field()
  socketId: string

  @Field()
  quizCode: string

  @Field()
  username: string
}