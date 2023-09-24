
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { Quiz } from './entities/quiz.entity'
import { Category } from '../category/entities/category.entity'

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto)
    return this.quizRepository.save(quiz)
  }

  // async findOne(id: number): Promise<Quiz | undefined> {
  //   return this.quizRepository.findOneBy({id})
  // }

  async findOne(id: number): Promise<Quiz | undefined> {
  return this.quizRepository
    .createQueryBuilder('quiz')
    .where('quiz.id = :id', { id })
    .leftJoinAndSelect('quiz.participants', 'participants')
    .getOne()
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


  async assignQuizToCategory(quizId: number, categoryId: number): Promise<Quiz> {
  const quiz = await this.quizRepository.findOne({
    where: { id: quizId }
  });
  const category = await this.categoryRepository.findOne({
    where: { id: categoryId }
  });

  if (!quiz || !category) {
    throw new NotFoundException('Quiz or category not found');
  }

  quiz.category = category;
  return await this.quizRepository.save(quiz);
}

async getQuizzesByCategory(categoryId: number): Promise<Quiz[]> {
  return this.quizRepository.find({
    where: { category: { id: categoryId } }
  })
}

}
