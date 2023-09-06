import { Quiz } from './quiz.entity';
export declare class Question {
    id: number;
    text: string;
    mediaUrl: string;
    format: string;
    options: string[];
    correctAnswers: string[];
    timer: number;
    quiz: Quiz;
}
