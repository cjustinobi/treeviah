// src/quiz/question.resolver.ts

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { QuestionService } from './question.service'
import { Question } from './question.entity'
import { CreateQuestionInput } from './question.input'

@Resolver(of => CreateQuestionInput)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(returns => CreateQuestionInput)
  async createQuestion(@Args('input') input: CreateQuestionInput): Promise<Question> {
    return this.questionService.createQuestion(input)
  }

  @Mutation(() => CreateQuestionInput)
  async updateQuestion(
    @Args('id') id: number,
    @Args('input') input: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionService.updateQuestion(id, input)
  }

  @Query(returns => CreateQuestionInput)
  async findOne(@Args('id') id: number): Promise<Question> {
    return this.questionService.findOne(id)
  }

  @Query(returns => CreateQuestionInput)
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll()
  }
}
