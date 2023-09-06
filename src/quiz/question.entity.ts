
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Quiz } from './quiz.entity'
import { User } from 'src/auth/entities/user.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ nullable: true })
  mediaUrl: string

  @Column()
  format: string // e.g., 'multiple-choice', 'true-false'

  @Column({ type: 'json', nullable: true })
  options: string[] // JSON array for multiple-choice options

  @Column({ type: 'json', nullable: true })
  correctAnswers: string[] // JSON array for correct answers in multiple-choice questions

  @Column({ type: 'int', nullable: true })
  timer: number // Time limit for the question in seconds

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz

  @ManyToOne(() => User, (user) => user.questions)
  user: User
}
