import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './quiz.entity';
export declare class QuizService {
    private readonly quizRepository;
    constructor(quizRepository: Repository<Quiz>);
    createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findOne(id: number): Promise<Quiz | undefined>;
    findAll(): Promise<Quiz[]>;
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    delete(id: number): Promise<void>;
}
