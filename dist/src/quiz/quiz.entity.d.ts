import { Question } from './question.entity';
import { Category } from '../category/entities/category.entity';
export declare class Quiz {
    id: number;
    title: string;
    questions: Question[];
    category: Category;
}
