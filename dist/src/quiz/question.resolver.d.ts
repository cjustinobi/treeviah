import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionInput } from './question.input';
export declare class QuestionResolver {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(input: CreateQuestionInput): Promise<Question>;
    updateQuestion(id: number, input: CreateQuestionInput): Promise<Question>;
    findOne(id: number): Promise<Question>;
    findAll(): Promise<Question[]>;
}
