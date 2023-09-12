
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuizDto } from './dto/create-quiz.dto'
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { Quiz } from './quiz.entity'

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = this.quizRepository.create(createQuizDto)
    return this.quizRepository.save(quiz)
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({id})
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }

    Object.assign(quiz, updateQuizDto)

    return this.quizRepository.save(quiz)
  }

  async findOne(id: number): Promise<Quiz | undefined> {
    return this.quizRepository.findOneBy({id})
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({ relations: ['questions'] })
  }
}
