import { User } from '../../auth/entities/user.entity';
import { Quiz } from './quiz.entity';
export declare class QuizParticipant {
    id: number;
    user: User;
    quiz: Quiz;
    score: number;
    socketId: string;
}
