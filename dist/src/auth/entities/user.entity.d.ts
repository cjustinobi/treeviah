import { QuizParticipant } from 'src/quiz/entities/quiz-participant.entity';
import { Question } from '../../quiz/entities/question.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    joinedQuizzes: Quiz[];
    quizParticipants: QuizParticipant[];
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    questions: Question[];
}
