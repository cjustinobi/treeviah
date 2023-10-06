import { Repository } from 'typeorm';
import { QuizParticipant } from './entities/quiz-participant.entity';
import { Leaderboard } from './entities/leaderboard.entity';
export declare class QuizParticipantService {
    private readonly quizParticipantRepository;
    private readonly leaderboardRepository;
    constructor(quizParticipantRepository: Repository<QuizParticipant>, leaderboardRepository: Repository<Leaderboard>);
    getQuizParticipantsBySocketId(socketId: string): Promise<QuizParticipant>;
    getQuizParticipantsByUsername(username: string): Promise<QuizParticipant>;
    getTopThreeParticipants(quizId: number): Promise<Leaderboard[]>;
}
