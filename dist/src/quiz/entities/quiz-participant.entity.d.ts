import { Quiz } from './quiz.entity';
export declare class QuizParticipant {
    id: number;
    username: string;
    quiz: Quiz;
    score: number;
    socketId: string;
}
