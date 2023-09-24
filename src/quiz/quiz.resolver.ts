import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { Quiz } from './entities/quiz.entity'
import { QuizService } from './quiz.service'
import { CreateQuizInput } from './input/quiz.input'
import { AssignQuizToCategoryInput } from './quiz-category.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards'
// import { WebSocketGateway } from '@nestjs/websockets'
import { QuizGateway } from './quiz.gateway'
import { QuizParticipant } from './entities/quiz-participant.entity'
import { QuizParticipantInput } from './input/quiz-participant.input'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ReqUser } from '../common/decorators'


@Resolver(of => CreateQuizInput)
@UseGuards(JwtAuthGuard)
export class QuizResolver {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizGateway: QuizGateway,
    @InjectRepository(QuizParticipant)
    private readonly quizParticipantRepository: Repository<QuizParticipant>
    ) {}

  @Query(returns => [CreateQuizInput], {name: 'getQuizzes'})
  async findAll(): Promise<CreateQuizInput[]> {
    return this.quizService.findAll()
  }

  @Query(returns => CreateQuizInput, {name: 'getQuiz'})
  async findOne(@Args('id') id: number): Promise<Quiz> {
    return this.quizService.findOne(id) 
  }

  @Query(() => [CreateQuizInput])
  async getQuizzesByCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<Quiz[]> {
    return this.quizService.getQuizzesByCategory(categoryId);
  }

  @Mutation(returns => CreateQuizInput, {name: 'createQuiz'})
  async create(@Args('input') input: CreateQuizInput): Promise<Quiz> {
    const quiz = await this.quizService.createQuiz(input)
    return quiz
  }

  @Mutation(returns => CreateQuizInput, {name: 'updateQuiz'})
  async update(
    @Args('id') id: number,
    @Args('input') input: CreateQuizInput
    ): Promise<Quiz> {
    return this.quizService.updateQuiz(id, input)
  }

  @Mutation(() => CreateQuizInput)
  async assignQuizToCategory(
    @Args('input') input: AssignQuizToCategoryInput,
  ): Promise<Quiz> {
    const { quizId, categoryId } = input;
      return await this.quizService.assignQuizToCategory(quizId, categoryId);
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

@Mutation(() => CreateQuizInput)
async startQuiz(@Args('id') id: number): Promise<Quiz> {

  const quiz = await this.quizService.findOne(id);

  if (quiz.status === 'Not Started') {
    quiz.status = 'In Progress';
    quiz.code = 'thecode'

    await this.quizService.updateQuiz(id, quiz);

    this.quizGateway.server.emit('quizStarted', {quiz})
    return quiz

    } else {
      throw new Error('Quiz is already in progress or completed.');
    }
  }

@Mutation(() => CreateQuizInput)
  async joinQuiz(
    @Args('quizId') quizId: number,
    @Args('socketId') socketId: string,
    @ReqUser() user: any
  ): Promise<Quiz> {
    // Retrieve the quiz by ID
    const quiz = await this.quizService.findOne(quizId)

    // Check if the quiz is in progress and not completed
    if (quiz.status === 'In Progress') {
      // Check if the user's socketId is not already in the participants array
      if (!quiz.participants.some((participant) => participant.socketId === socketId)) {
        // Create a new QuizParticipant instance and populate it with data from QuizParticipantInput
        const newParticipant = new QuizParticipant();
        newParticipant.socketId = socketId
        newParticipant.user = user.id

        await this.quizParticipantRepository.save(newParticipant)
        quiz.participants.push(newParticipant);

        // Update the quiz with the modified participants array
        await this.quizService.updateQuiz(quizId, quiz);

        // Emit a 'userJoined' event to notify other participants
        this.quizGateway.server.emit('userJoined', { quizId, socketId });

        return quiz;
      } else {
        throw new Error('User is already a participant in this quiz.');
      }
    } else {
      throw new Error('Quiz is not in progress or has been completed.');
    }

  }
}






// Backend Logic: In your NestJS controllers or services, implement the logic to manage user participation in quizzes. This includes adding users to quizzes, validating answers, calculating scores, and emitting relevant events.

// When a user joins a quiz, add their socket ID to the quiz participants.
// When a question is asked, emit the question to all participants.
// When a user submits answers, validate them, calculate scores, and emit results.
// Broadcasting: Use the server.emit method in your WebSocket Gateway to broadcast events to all connected clients or specific users as needed. For example, you can emit events to notify all participants when a new user joins or when a question is updated.