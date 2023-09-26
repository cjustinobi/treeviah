import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './input/question.input';
export declare class QuestionResolver {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getNextQuestion(): Promise<Question>;
    createQuestion(input: CreateQuestionInput, user: any): Promise<Question>;
    findOne(id: number): Promise<Question>;
    findAll(): Promise<Question[]>;
    update(id: number, input: CreateQuestionInput, user: any): Promise<Question>;
    delete(id: number): Promise<boolean>;
}
