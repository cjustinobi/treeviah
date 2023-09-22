import { Server, Socket } from 'socket.io';
export declare class QuizGateway {
    server: Server;
    listenForMessages(message: string): void;
    handleHelloEvent(client: Socket, payload: string): void;
}
