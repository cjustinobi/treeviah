import { Quiz } from './entities/quiz.entity';
import { QuizService } from './quiz.service';
import { CreateQuizInput } from './input/quiz.input';
import { AssignQuizToCategoryInput } from './quiz-category.input';
import { QuizGateway } from './quiz.gateway';
import { QuizParticipant } from './entities/quiz-participant.entity';
import { Repository } from 'typeorm';
import { JoinQuizInput } from './input/join-quiz.input';
import { CodeGenerator } from './helpers';
import { UpdateQuizInput } from './input/update-quiz.input';
export declare class QuizResolver {
    private readonly quizService;
    private readonly quizGateway;
    private readonly codeGenerator;
    private readonly quizParticipantRepository;
    constructor(quizService: QuizService, quizGateway: QuizGateway, codeGenerator: CodeGenerator, quizParticipantRepository: Repository<QuizParticipant>);
    findAll(): Promise<CreateQuizInput[]>;
    findOne(id: number): Promise<Quiz>;
    getQuizzesByCategory(categoryId: number): Promise<Quiz[]>;
    create(input: CreateQuizInput): Promise<Quiz>;
    update(id: number, input: UpdateQuizInput): Promise<Quiz>;
    assignQuizToCategory(input: AssignQuizToCategoryInput): Promise<Quiz>;
    onboardPlayers(id: number): Promise<Quiz>;
    startQuiz(quizId: number): Promise<Quiz>;
    joinQuiz(input: JoinQuizInput): Promise<Quiz>;
}
