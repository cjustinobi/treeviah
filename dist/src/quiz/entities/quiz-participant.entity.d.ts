import { Quiz } from './quiz.entity';
import { Leaderboard } from './leaderboard.entity';
export declare class QuizParticipant {
    id: number;
    username: string;
    quiz: Quiz;
    score: number;
    socketId: string;
    leaderboard: Leaderboard[];
}
