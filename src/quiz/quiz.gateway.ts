import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { QuestionService } from './question.service'
import { QuizParticipantService } from './quiz-participant.service'
import { LeaderboardService } from '../leaderboard/leaderboard.service'
import { PointCalculator } from './helpers/point-calculator'

@WebSocketGateway()
export class QuizGateway {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizParticipantService: QuizParticipantService,
    private readonly leaderboardService: LeaderboardService,
    private readonly pointCalculator: PointCalculator
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
      this.server.emit('nextQuestion', { question: nextQuestion })
      // this.server.to(`quiz-${quizId}`).emit('nextQuestion', { question: nextQuestion })

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
  async handleSubmitAnswer(client: Socket, data: {questionId: number, answer: string}) {
    
    const user = await this.quizParticipantService.getQuizParticipantsByUsername('menhyui')
    if (!user) return

    const question = await this.questionService.findOne(data.questionId)

    if (!question) return

    const isCorrect = data.answer === question.correctAnswers[0]

    const answerTimestamp = new Date()
    const timeTaken = answerTimestamp.getTime() - question.timestamp.getTime()

    const points = this.pointCalculator.calculatePoints(timeTaken, question.timer)
 
    await this.leaderboardService.updateLeaderboard(user, points)

    this.server.emit('answerResult', {
    // this.server.to(`quiz-${question.quiz.id}`).emit('answerResult', {
      username: user,
      isCorrect,
      timeTaken
    })
  }
}