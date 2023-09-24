import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './entities/quiz.entity'
import { Question } from './entities/question.entity'
import { Category } from '../category/entities/category.entity'
// import { QuizGateway } from './quiz.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Category])],
  providers: [QuizService, QuestionService],
  exports: [QuizService, QuestionService]
})
export class QuizModule {}
