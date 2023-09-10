import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { CreateQuizInput } from './quiz.input';
export declare class QuizResolver {
    private readonly quizService;
    constructor(quizService: QuizService);
    quizzes(): Promise<CreateQuizInput[]>;
    createQuiz(title: CreateQuizInput): Promise<Quiz>;
}
