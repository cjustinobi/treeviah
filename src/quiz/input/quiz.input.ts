import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Quiz')
export class CreateQuizInput {
  @Field({nullable: true})
  id: number

  @Field()
  title: string

}
