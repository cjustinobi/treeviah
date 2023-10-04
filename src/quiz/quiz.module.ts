import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './entities/quiz.entity'
import { Question } from './entities/question.entity'
import { Category } from '../category/entities/category.entity'
import { CodeGenerator } from './helpers'
import { QuizParticipantService } from './quiz-participant.service'
import { QuizParticipant } from './entities/quiz-participant.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Category, QuizParticipant])],
  providers: [QuizService, QuestionService, CodeGenerator, QuizParticipantService],
  exports: [QuizService, QuestionService, CodeGenerator, QuizParticipantService]
})
export class QuizModule {}
