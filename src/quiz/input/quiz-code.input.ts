import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('QuizCode')
export class QuizCodeInput {
  @Field()
  code: string
}
