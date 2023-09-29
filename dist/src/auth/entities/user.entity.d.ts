import { Question } from '../../quiz/entities/question.entity';
export declare class User {
    id: number;
    fullname: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    questions: Question[];
}
