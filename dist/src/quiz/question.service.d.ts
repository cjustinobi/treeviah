import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './question.entity';
export declare class QuestionService {
    private readonly questionRepository;
    constructor(questionRepository: Repository<Question>);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findOne(id: number): Promise<Question | undefined>;
    findAll(): Promise<Question[]>;
    updateQuestion(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
}
