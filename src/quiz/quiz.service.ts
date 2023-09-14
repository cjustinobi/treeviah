
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { Quiz } from './quiz.entity'
import { Category } from '../category/entities/category.entity'

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto)
    return this.quizRepository.save(quiz)
  }

  async findOne(id: number): Promise<Quiz | undefined> {
    return this.quizRepository.findOneBy({id})
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions'] })
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({id})
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    Object.assign(quiz, updateQuizDto)

    return this.quizRepository.save(quiz)
  }

  async delete(id: number): Promise<void> {
    const quiz = await this.quizRepository.findOneBy({id})
    if (!quiz) {
      throw new NotFoundException('Question not found')
    }

    await this.quizRepository.remove(quiz)
  }


//   async assignQuizToCategory(quizId: any, categoryId: any): Promise<void> {
//   const quiz = await this.quizRepository.findOneBy(quizId);
//   const category = await this.categoryRepository.findOneBy(categoryId);

//   if (!quiz || !category) {
//     throw new NotFoundException('Quiz or category not found');
//   }

//   quiz.category = category;
//   await this.quizRepository.save(quiz);
// }

async updateQuizCategory(quizId: number, categoryId: number): Promise<void> {
  // Similar to the assignQuizToCategory method, but it updates the category of an existing quiz.
}

// async getQuizzesByCategory(categoryId: number): Promise<Quiz[]> {
//   return this.quizRepository.find({
//     where: { category: categoryId },
//   });
// }

}
