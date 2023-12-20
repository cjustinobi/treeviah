import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('QuizParticipant')
export class QuizParticipantInput {
  @Field()
  socketId: string

  @Field()
  score: number
}
