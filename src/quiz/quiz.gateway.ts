import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuestionService } from './question.service';

@WebSocketGateway()
export class QuizGateway {
  constructor(private readonly questionService: QuestionService) {} 
  
    @WebSocketServer()
    server: Server


  private currentQuestionIndex = 0; // Initialize the current question index

  // Define a timer interval (in milliseconds)
  private timerInterval = 10000

  @SubscribeMessage('nQuestion')
  async fetchNextQuestionAndEmit(quizId: number): Promise<void> {
    const questions = await this.questionService.findAll()

    if (this.currentQuestionIndex < questions.length) {
      const nextQuestion = questions[this.currentQuestionIndex]
      this.currentQuestionIndex++;

      // Emit the next question to all participants in the quiz
      
      // this.server.emit('nextQuestion', { question: nextQuestion });
      this.server.to(`quiz-${quizId}`).emit('nextQuestion', { question: nextQuestion });

      // Schedule the next fetch after the timer interval
      setTimeout(() => {
        this.fetchNextQuestionAndEmit(quizId)
      }, this.timerInterval)
    }
  }

  @SubscribeMessage('joinQuiz')
  handleJoinQuiz(client: Socket, quizId: number) {
    client.join(`quiz-${quizId}`)
    this.server.emit('userJoined', { quizId, userId: client.id })
  }

  // Handle user submitting answers
  @SubscribeMessage('submitAnswers')
  handleSubmitAnswers(client: Socket, data: any) {

  }
}