import { QuizParticipant } from './quiz-participant.entity';
export declare class Leaderboard {
    id: number;
    participant: QuizParticipant;
    totalPoints: number;
    timestamp: Date;
}
