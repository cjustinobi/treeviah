import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Category')
export class CreateCategoryInput {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string
}
