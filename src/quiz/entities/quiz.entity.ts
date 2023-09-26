
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Question } from './question.entity'
import { Category } from '../../category/entities/category.entity'
import { QuizParticipant } from './quiz-participant.entity'

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  code: string

  @Column({ type: 'enum', enum: ['Not Started', 'Onboarding', 'In Progress', 'Completed'], default: 'Not Started' })
  status: string

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[]

  @ManyToOne(() => Category, (category) => category.quizzes, {
    onDelete: 'CASCADE',
    nullable: true
  })
  category: Category

  @OneToMany(() => QuizParticipant, (participant) => participant.quiz)
  participants: QuizParticipant[]
}
