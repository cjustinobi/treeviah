import { Server, Socket } from 'socket.io';
import { QuestionService } from './question.service';
export declare class QuizGateway {
    private readonly questionService;
    constructor(questionService: QuestionService);
    server: Server;
    private currentQuestionIndex;
    private timerInterval;
    fetchNextQuestionAndEmit(quizId: number): Promise<void>;
    handleJoinQuiz(client: Socket, quizId: number): void;
    handleSubmitAnswers(client: Socket, data: any): void;
}
