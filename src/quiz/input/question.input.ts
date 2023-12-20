import { InputType, Field, Int, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Question')
export class CreateQuestionInput {
  @Field()
  text: string

  @Field({ nullable: true })
  mediaUrl?: string

  @Field({
    description:
      'Select any of these: [multiple-choice, boolean, puzzle, type-answer]',
  })
  format: string

  @Field(() => [String], { nullable: true })
  options?: string[]

  @Field(() => [String], { nullable: true })
  correctAnswers?: string[]

  @Field({ nullable: true })
  multipleAnswers?: boolean

  @Field(() => Int, { nullable: true })
  timer?: number

  @Field(() => String, {
    description: 'Select any of these: [standard, double, no-point]',
  })
  point: string

  @Field(() => Int, { description: 'Enter the ID of the quiz' }) // Assuming that the quizId is an integer
  quiz: number
}
