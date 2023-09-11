import { InputType, Field, Int, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Question')
export class CreateQuestionInput {
  @Field()
  text: string

  @Field({ nullable: true })
  mediaUrl?: string

  @Field()
  format: string

  @Field(() => [String], { nullable: true })
  options?: string[]

  @Field(() => [String], { nullable: true })
  correctAnswers?: string[]

  @Field(() => Int, { nullable: true })
  timer?: number

  @Field(() => Int, { description: 'Enter the ID of the quiz'}) // Assuming that the quizId is an integer
  quiz: number
}
