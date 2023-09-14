import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './quiz.entity';
import { Category } from '../category/entities/category.entity';
export declare class QuizService {
    private readonly quizRepository;
    private readonly categoryRepository;
    constructor(quizRepository: Repository<Quiz>, categoryRepository: Repository<Category>);
    createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz>;
    findOne(id: number): Promise<Quiz | undefined>;
    findAll(): Promise<Quiz[]>;
    updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    delete(id: number): Promise<void>;
    assignQuizToCategory(quizId: any, categoryId: any): Promise<void>;
    updateQuizCategory(quizId: number, categoryId: number): Promise<void>;
}
