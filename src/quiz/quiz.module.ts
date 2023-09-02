import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './quiz.entity'
import { Question } from './question.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  providers: [QuizService, QuestionService],
  exports: [QuizService, QuestionService]
})
export class QuizModule {}
