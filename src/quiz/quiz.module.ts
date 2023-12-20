import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { QuestionService } from './question.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Quiz } from './entities/quiz.entity'
import { Question } from './entities/question.entity'
import { Category } from '../category/entities/category.entity'
import { CodeGenerator, PointCalculator } from './helpers'
import { QuizParticipantService } from './quiz-participant.service'
import { QuizParticipant } from './entities/quiz-participant.entity'
import { Leaderboard } from './entities/leaderboard.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      Question,
      Category,
      QuizParticipant,
      Leaderboard,
    ]),
  ],
  providers: [
    QuizService,
    QuestionService,
    CodeGenerator,
    PointCalculator,
    QuizParticipantService,
  ],
  exports: [
    QuizService,
    QuestionService,
    CodeGenerator,
    PointCalculator,
    QuizParticipantService,
  ],
})
export class QuizModule {}
