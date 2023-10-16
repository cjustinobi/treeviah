import { Question } from './question.entity';
import { Category } from '../../category/entities/category.entity';
import { QuizParticipant } from './quiz-participant.entity';
export declare class Quiz {
    id: number;
    title: string;
    code: string;
    status: string;
    questions: Question[];
    category: Category;
    participants: QuizParticipant[];
}
