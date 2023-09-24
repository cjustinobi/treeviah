
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Quiz } from './quiz.entity'
import { User } from 'src/auth/entities/user.entity'

enum QuestionFormat {
  MULTIPLE_CHOICE = 'multiple-choice',
  BOOLEAN = 'boolean',
  PUZZLE = 'puzzle',
  TYPE_ANSWER = 'type-answer',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ nullable: true })
  mediaUrl: string

  @Column({ 
    type: 'enum', 
    enum: ['multiple-choice', 'boolean', 'puzzle', 'type-answer']
  })
    format: string

  @Column({ type: 'json'})
  options: string[] 

  @Column({ type: 'json'})
  correctAnswers: string[]

  @Column({ type: 'json', nullable: true, comment: 'This works in tandem when the format is multiple choice' })
  multipleAnswers: boolean 

  @Column({ comment: 'In seconds'})
  timer: number

  @Column({ type: 'enum', enum: ['standard', 'double', 'no-point'], default: 'standard'})
  point: string

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz

  @ManyToOne(() => User, (user) => user.questions)
  user: User
}
