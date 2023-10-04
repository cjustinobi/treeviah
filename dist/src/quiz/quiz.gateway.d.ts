import { Server, Socket } from 'socket.io';
import { QuestionService } from './question.service';
import { QuizParticipantService } from './quiz-participant.service';
export declare class QuizGateway {
    private readonly questionService;
    private readonly quizParticipantService;
    constructor(questionService: QuestionService, quizParticipantService: QuizParticipantService);
    server: Server;
    private currentQuestionIndex;
    private timerInterval;
    fetchNextQuestionAndEmit(quizId: number): Promise<void>;
    handleJoinQuiz(client: Socket, quizId: number): void;
    handleSubmitAnswer(client: Socket, questionId: number, answer: string): Promise<void>;
}
