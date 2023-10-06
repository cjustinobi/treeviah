import { Repository } from 'typeorm';
import { QuizParticipant } from './entities/quiz-participant.entity';
export declare class QuizParticipantService {
    private readonly quizParticipantRepository;
    constructor(quizParticipantRepository: Repository<QuizParticipant>);
    getQuizParticipantsBySocketId(socketId: string): Promise<QuizParticipant>;
    getQuizParticipantsByUsername(username: string): Promise<QuizParticipant>;
}
