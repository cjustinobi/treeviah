import { Quiz } from '../../quiz/quiz.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    quizzes: Quiz[];
}
