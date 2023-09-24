
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.quizParticipants)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.participants)
  quiz: Quiz;

  @Column({ nullable: true})
  score: number;

  @Column()
  socketId: string;

}
