import { Server, Socket } from 'socket.io';
export declare class QuizGateway {
    server: Server;
    handleJoinQuiz(client: Socket, quizId: number): void;
    handleSubmitAnswers(client: Socket, data: any): void;
}
