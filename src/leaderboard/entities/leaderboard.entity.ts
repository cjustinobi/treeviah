import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm'
import { QuizParticipant } from '../../quiz/entities/quiz-participant.entity'

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => QuizParticipant, (participant) => participant.leaderboard)
  participant: QuizParticipant

  @Column({ type: 'int', default: 0 })
  totalPoints: number

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date
}
