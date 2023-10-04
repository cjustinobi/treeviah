
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm'
import { Quiz } from './quiz.entity'
import { Leaderboard } from './leaderboard.entity'

@Entity()
export class QuizParticipant {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  username: string

  @ManyToOne(() => Quiz, (quiz) => quiz.participants)
  quiz: Quiz

  @Column({ nullable: true})
  score: number

  @Column()
  socketId: string

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.participant)
  leaderboard: Leaderboard[]

}
