import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Quiz } from '../../quiz/quiz.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quizzes: Quiz[]
}
