import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class QuestionService {
    private readonly questionRepository;
    constructor(questionRepository: Repository<Question>);
    createQuestion(createQuestionDto: CreateQuestionDto, user: User): Promise<Question>;
    findOne(id: number): Promise<Question | undefined>;
    findAll(): Promise<Question[]>;
    update(id: number, updateQuestionDto: UpdateQuestionDto, user: User): Promise<Question>;
    delete(id: number): Promise<void>;
    updateQuestionTimestamp(id: number): Promise<Question>;
}
