import { InputType, Field, Int, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('QuizToCategory')
export class AssignQuizToCategoryInput {
  @Field(() => Int)
  quizId: number

  @Field(() => Int)
  categoryId: number
}
