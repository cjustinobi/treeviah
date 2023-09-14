import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Category } from './entities/category.entity'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards'
import { CategoryService } from './category.service'
import { CreateCategoryInput } from './input/category.input'
import { UpdateCategoryInput } from './input/update-category.input'

@Resolver(of => CreateCategoryInput)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CreateCategoryInput, { nullable: true, name: 'getCategory' })
  async category(@Args('id') id: number): Promise<Category | undefined> {
    return this.categoryService.findOne(id);
  }

  @Query(() => [CreateCategoryInput], { name: 'getCategories' })
  async categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

 @Mutation(() => CreateCategoryInput, { name: 'createCategory'})
  async create(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Mutation(() => CreateCategoryInput)
  async updateCategory(
    @Args('id') id: number,
    @Args('input') input: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    await this.categoryService.delete(id);
    return true;
  }


}
