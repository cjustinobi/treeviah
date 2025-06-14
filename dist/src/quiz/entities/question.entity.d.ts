import { Quiz } from './quiz.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class Question {
    id: number;
    text: string;
    mediaUrl: string;
    format: string;
    options: string[];
    correctAnswers: string[];
    multipleAnswers: boolean;
    timer: number;
    point: string;
    quiz: Quiz;
    user: User;
    timestamp: Date;
}
