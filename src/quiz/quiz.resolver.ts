import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { Quiz } from './entities/quiz.entity'
import { QuizService } from './quiz.service'
import { CreateQuizInput } from './input/quiz.input'
import { AssignQuizToCategoryInput } from './quiz-category.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards'
import { QuizGateway } from './quiz.gateway'
import { QuizParticipant } from './entities/quiz-participant.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { JoinQuizInput } from './input/join-quiz.input'
import { QuizCodeInput } from './input/quiz-code.input'
import { CodeGenerator } from './helpers'
import { UpdateQuizInput } from './input/update-quiz.input'

@Resolver((of) => CreateQuizInput)
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizGateway: QuizGateway,
    private readonly codeGenerator: CodeGenerator,
    @InjectRepository(QuizParticipant)
    private readonly quizParticipantRepository: Repository<QuizParticipant>
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query((returns) => [CreateQuizInput], { name: 'getQuizzes' })
  async findAll(): Promise<CreateQuizInput[]> {
    return this.quizService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Query((returns) => CreateQuizInput, { name: 'getQuiz' })
  async findOne(@Args('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CreateQuizInput])
  async getQuizzesByCategory(
    @Args('categoryId') categoryId: number
  ): Promise<Quiz[]> {
    return this.quizService.getQuizzesByCategory(categoryId)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CreateQuizInput, { name: 'createQuiz' })
  async create(@Args('input') input: CreateQuizInput): Promise<Quiz> {
    const quiz = await this.quizService.createQuiz(input)
    return quiz
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CreateQuizInput, { name: 'updateQuiz' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateQuizInput
  ): Promise<Quiz> {
    return this.quizService.updateQuiz(id, input)
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateQuizInput)
  async assignQuizToCategory(
    @Args('input') input: AssignQuizToCategoryInput
  ): Promise<Quiz> {
    const { quizId, categoryId } = input
    return await this.quizService.assignQuizToCategory(quizId, categoryId)
  }

  // @Mutation(() => Boolean, {name: 'deleteQuiz'})
  // async delete(@Args('id') id: number): Promise<boolean> {
  //   try {
  //     await this.quizService.delete(id)
  //     return true
  //   } catch {
  //     return false
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  // @Mutation(() => CreateQuizInput)
  @Mutation(() => QuizCodeInput)
  async onboardPlayers(@Args('quizId') id: number): Promise<Quiz> {
    const quiz = await this.quizService.findOne(id)

    if (quiz.status === 'Not Started') {
      quiz.status = 'Onboarding'
      quiz.code = this.codeGenerator.generateCode(5)
      await this.quizService.updateQuiz(id, quiz)

      this.quizGateway.server.emit('onboardingStarted', { quizCode: quiz.code })
      return quiz
    } else {
      throw new Error('Quiz is already in progress or completed.')
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateQuizInput)
  async startQuiz(@Args('quizId') quizId: number): Promise<Quiz> {
    const quiz = await this.quizService.findOne(quizId)

    if (quiz.status === 'Onboarding') {
      quiz.status = 'In Progress'

      await this.quizService.updateQuiz(quizId, quiz)

      await this.quizGateway.fetchNextQuestionAndEmit(quizId)
      return quiz
    } else {
      throw new Error("Can't start quiz at this moment")
    }
  }

  @Mutation(() => CreateQuizInput)
  async joinQuiz(@Args('input') input: JoinQuizInput): Promise<Quiz> {
    const { quizId, socketId, quizCode, username } = input

    const quiz = await this.quizService.findOne(quizId)

    if (quizCode !== quiz.code) throw new Error('Quiz code does not match.')

    // Check if the quiz is in progress and not completed
    if (quiz.status === 'Onboarding') {
      // Check if the user's socketId is not already in the participants array
      if (
        !quiz.participants.some(
          (participant) => participant.socketId === socketId
        )
      ) {
        // Create a new QuizParticipant instance and populate it with data from QuizParticipantInput
        const newParticipant = new QuizParticipant()
        newParticipant.socketId = socketId
        newParticipant.username = username

        await this.quizParticipantRepository.save(newParticipant)
        quiz.participants.push(newParticipant)

        // Update the quiz with the modified participants array
        await this.quizService.updateQuiz(quizId, quiz)

        this.quizGateway.server.emit('userJoined', {
          quizId,
          socketId,
          username,
        })

        return quiz
      } else {
        throw new Error('User is already a participant in this quiz.')
      }
    } else {
      throw new Error('Quiz is not in progress or has been completed.')
    }
  }
}

// Backend Logic: In your NestJS controllers or services, implement the logic to manage user participation in quizzes. This includes adding users to quizzes, validating answers, calculating scores, and emitting relevant events.

// When a user joins a quiz, add their socket ID to the quiz participants.
// When a question is asked, emit the question to all participants.
// When a user submits answers, validate them, calculate scores, and emit results.
// Broadcasting: Use the server.emit method in your WebSocket Gateway to broadcast events to all connected clients or specific users as needed. For example, you can emit events to notify all participants when a new user joins or when a question is updated.
