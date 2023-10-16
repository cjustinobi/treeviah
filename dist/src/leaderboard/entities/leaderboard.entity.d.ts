import { QuizParticipant } from '../../quiz/entities/quiz-participant.entity';
export declare class Leaderboard {
    id: number;
    participant: QuizParticipant;
    totalPoints: number;
    timestamp: Date;
}
