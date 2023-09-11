import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { CreateQuizInput } from './quiz.input';
export declare class QuizResolver {
    private readonly quizService;
    constructor(quizService: QuizService);
    findAll(): Promise<CreateQuizInput[]>;
    findOne(id: number): Promise<Quiz>;
    create(input: CreateQuizInput): Promise<Quiz>;
    update(id: number, input: CreateQuizInput): Promise<Quiz>;
}
