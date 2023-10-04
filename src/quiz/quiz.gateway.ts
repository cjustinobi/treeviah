import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QuestionService } from './question.service'
import { QuizParticipantService } from './quiz-participant.service'

@WebSocketGateway()
export class QuizGateway {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizParticipantService: QuizParticipantService
    ) {} 
  
    @WebSocketServer()
    server: Server


  private currentQuestionIndex = 0

  private timerInterval = 10000

  @SubscribeMessage('nQuestion')
  async fetchNextQuestionAndEmit(quizId: number): Promise<void> {
    const questions = await this.questionService.findAll()

    if (this.currentQuestionIndex < questions.length) {
      const nextQuestion = questions[this.currentQuestionIndex]
      this.currentQuestionIndex++
      this.server.emit('nextQuestion', { question: nextQuestion });
      // this.server.to(`quiz-${quizId}`).emit('nextQuestion', { question: nextQuestion });

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

   @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(client: Socket, questionId: number, answer: string ) {
    
    const user = await this.quizParticipantService.getQuizParticipantsBySocketId(client.id)
console.log('ffhf')
console.log(user)
    const question = await this.questionService.findOne(questionId)

    if (!question) {

      return
    }

    // Check if the user's answer is correct.
    const isCorrect = answer === question.correctAnswers[0]

    // Calculate the time taken by the user to answer the question.
    const answerTimestamp = new Date();
    const timeTaken = answerTimestamp.getTime() - question.timestamp.getTime();

    // await this.updateLeaderboard(user, isCorrect, timeTaken);

    // Emit an event to notify other clients about the result.
    this.server.to(`quiz-${question.quiz.id}`).emit('answerResult', {
      username: user,
      isCorrect,
      timeTaken
    })
  }
}