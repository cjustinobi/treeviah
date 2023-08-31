
import { UserInput } from 'src/auth/user.type';
import { ProductInput } from './product.input';
import { ProductService } from './product.service';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql'
import { GetUser } from 'src/auth/get-user.decorator';

@Resolver(of => ProductInput)
export class ProductResolver {
  constructor(
    private productService: ProductService
  ) {}

  @Query(returns => ProductInput, {name: 'product'})
  async getProduct(@Args('productId') productId: number, @Args('userId') userId: number) {
    return this.productService.findOne(productId, userId) 
  }

  @Mutation(() => ProductInput)
  async createProduct(@Args('productInput') productInput: ProductInput, @Args('userId') userId: number) {
    return this.productService.create(productInput, userId)
  }

  @ResolveField('user', returns => UserInput)
  async getPosts(@GetUser() user) {
   
    return user
  }
 
}