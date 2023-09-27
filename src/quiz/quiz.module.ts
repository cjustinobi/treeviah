import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './entities/quiz.entity'
import { Question } from './entities/question.entity'
import { Category } from '../category/entities/category.entity'
import { CodeGenerator } from './helpers'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Category])],
  providers: [QuizService, QuestionService, CodeGenerator],
  exports: [QuizService, QuestionService, CodeGenerator]
})
export class QuizModule {}
