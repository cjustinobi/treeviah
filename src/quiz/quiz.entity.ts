
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Question } from './question.entity'
import { Category } from '../category/entities/category.entity'

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[]

  @ManyToOne(() => Category, (category) => category.quizzes, {
    onDelete: 'CASCADE',
    nullable: true
  })
  category: Category
}
