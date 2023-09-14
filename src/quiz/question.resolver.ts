
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { QuestionService } from './question.service'
import { Question } from './question.entity'
import { CreateQuestionInput } from './question.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../common/guards'
import { ReqUser } from '../common/decorators'



@Resolver(of => CreateQuestionInput)
@UseGuards(JwtAuthGuard)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(returns => CreateQuestionInput)
  async createQuestion(
    @Args('input') input: CreateQuestionInput,
    @ReqUser() user: any
    ): Promise<Question> {

    return this.questionService.createQuestion(input, user)
  }

  @Query(returns => CreateQuestionInput, { name: 'getQuestion' })
  async findOne(@Args('id') id: number): Promise<Question> {
    return this.questionService.findOne(id)
  }

  @Query(returns => [CreateQuestionInput], { name: 'getQuestions' })
  async findAll() {
    return this.questionService.findAll()
  }

  @Mutation(() => CreateQuestionInput, { name: 'updateQuestion' })
  async update(
    @Args('id') id: number,
    @Args('input') input: CreateQuestionInput,
    @ReqUser() user: any
  ): Promise<Question> {
    return this.questionService.update(id, input, user)
  }

  @Mutation(() => Boolean, {name: 'deleteQuestion'})
  async delete(@Args('id') id: number): Promise<boolean> {
    try {
      await this.questionService.delete(id)
      return true
    } catch {
      return false
    }
  }
}
