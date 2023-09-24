import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class QuizGateway {
    @WebSocketServer()
    server: Server;
  
      // Handle user joining a quiz
  @SubscribeMessage('joinQuiz')
  handleJoinQuiz(client: Socket, quizId: number) {
    // Implement logic to add the user to the quiz and notify others
    // For example, you can emit a 'userJoined' event to notify other participants.
    this.server.emit('userJoined', { quizId, userId: client.id });
  }

  // Handle user submitting answers
  @SubscribeMessage('submitAnswers')
  handleSubmitAnswers(client: Socket, data: any) {
    // Implement logic to process submitted answers
    // For example, validate answers, calculate scores, and emit results.
  }
}