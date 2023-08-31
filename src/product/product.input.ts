import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'
import { type } from 'os';
import { User } from 'src/auth/entities/user.entity';
import { UserInput } from 'src/auth/user.type';

@InputType()
@ObjectType('Product')
export class ProductInput {
  @Field(type => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  desc: string;

  @Field()
  price: number;

  @Field(type => UserInput, { nullable: true }) 
  user: UserInput; 
}