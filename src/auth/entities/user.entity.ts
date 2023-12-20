import { QuizParticipant } from 'src/quiz/entities/quiz-participant.entity'
import { Question } from '../../quiz/entities/question.entity'
import { Quiz } from '../../quiz/entities/quiz.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullname: string

  @Column()
  @Unique(['string'])
  username: string

  @Column()
  email: string

  @Column()
  salt: string

  @Column()
  password: string

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date | null

  @DeleteDateColumn()
  public deleted_at: Date | null

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]
}

{
}
