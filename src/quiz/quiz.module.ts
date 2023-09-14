import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './quiz.entity'
import { Question } from './question.entity'
import { Category } from '../category/entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Category])],
  providers: [QuizService, QuestionService],
  exports: [QuizService, QuestionService]
})
export class QuizModule {}
