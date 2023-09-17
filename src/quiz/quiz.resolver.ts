import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Quiz } from './quiz.entity'
import { QuizService } from './quiz.service'
import { CreateQuizInput } from './quiz.input'
import { AssignQuizToCategoryInput } from './quiz-category.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards'

@Resolver(of => CreateQuizInput)
@UseGuards(JwtAuthGuard)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Query(returns => [CreateQuizInput], {name: 'getQuizzes'})
  async findAll(): Promise<CreateQuizInput[]> {
    return this.quizService.findAll()
  }

  @Query(returns => CreateQuizInput, {name: 'getQuiz'})
  async findOne(@Args('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(id) 
  }

  @Query(() => [CreateQuizInput])
  async getQuizzesByCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<Quiz[]> {
    return this.quizService.getQuizzesByCategory(categoryId);
  }

  @Mutation(returns => CreateQuizInput, {name: 'createQuiz'})
  async create(@Args('input') input: CreateQuizInput): Promise<Quiz> {
    return this.quizService.createQuiz(input)
  }

  @Mutation(returns => CreateQuizInput, {name: 'updateQuiz'})
  async update(
    @Args('id') id: number,
    @Args('input') input: CreateQuizInput
    ): Promise<Quiz> {
    return this.quizService.updateQuiz(id, input)
  }

  @Mutation(() => CreateQuizInput)
  async assignQuizToCategory(
    @Args('input') input: AssignQuizToCategoryInput,
  ): Promise<Quiz> {
    const { quizId, categoryId } = input;
      return await this.quizService.assignQuizToCategory(quizId, categoryId);
  }

  // @Mutation(() => Boolean, {name: 'deleteQuiz'})
  // async delete(@Args('id') id: number): Promise<boolean> {
  //   try {
  //     await this.quizService.delete(id)
  //     return true
  //   } catch {
  //     return false
  //   }
  // }
}
