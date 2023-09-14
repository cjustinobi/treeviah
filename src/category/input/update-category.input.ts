import { InputType, Field, ObjectType } from '@nestjs/graphql'

@InputType()
@ObjectType('Category')
export class UpdateCategoryInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string
}
