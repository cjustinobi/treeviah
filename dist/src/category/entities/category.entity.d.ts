import { Quiz } from '../../quiz/entities/quiz.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    quizzes: Quiz[];
}
