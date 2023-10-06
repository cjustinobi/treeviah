import { Server, Socket } from 'socket.io';
import { QuestionService } from './question.service';
import { QuizParticipantService } from './quiz-participant.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { PointCalculator } from './helpers/point-calculator';
export declare class QuizGateway {
    private readonly questionService;
    private readonly quizParticipantService;
    private readonly leaderboardService;
    private readonly pointCalculator;
    constructor(questionService: QuestionService, quizParticipantService: QuizParticipantService, leaderboardService: LeaderboardService, pointCalculator: PointCalculator);
    server: Server;
    private currentQuestionIndex;
    private timerInterval;
    fetchNextQuestionAndEmit(quizId: number): Promise<void>;
    handleJoinQuiz(client: Socket, quizId: number): void;
    handleSubmitAnswer(client: Socket, data: {
        questionId: number;
        answer: string;
    }): Promise<void>;
}
