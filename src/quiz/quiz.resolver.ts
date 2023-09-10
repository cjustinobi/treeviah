import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service'; // Create this service if it doesn't exist
import { CreateQuizDto } from './dto/create-quiz.dto'
import { CreateQuizInput } from './quiz.input';

@Resolver(of => CreateQuizInput)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Query(returns => [CreateQuizInput])
  async quizzes(): Promise<CreateQuizInput[]> {
    // Implement logic to fetch and return all quizzes from the database
    return this.quizService.findAll(); // You'll need to create this method in QuizService
  }

  // @Query(returns => Quiz)
  // async quiz(@Args('id') id: number): Promise<Quiz> {
    
  //   return this.quizService.findOne(id); // You'll need to create this method in QuizService
  // }

  @Mutation(returns => CreateQuizInput)
  async createQuiz(@Args('title') title: CreateQuizInput): Promise<Quiz> {

    return this.quizService.createQuiz(title); // You'll need to create this method in QuizService
  }
}
