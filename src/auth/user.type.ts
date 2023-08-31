import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'
import { ProductInput } from 'src/product/product.input'

@InputType() 
@ObjectType('User')
export class UserInput {
  @Field(type => ID)
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  salt: string;

  @Field()
  password: string;

 @Field(type => [ProductInput]) // Specify the type of the products field as an array of ProductType
  products: ProductInput[];
}