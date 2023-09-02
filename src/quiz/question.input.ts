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
}
