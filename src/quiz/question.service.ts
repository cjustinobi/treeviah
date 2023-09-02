
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Question } from './question.entity'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto)
    return this.questionRepository.save(question)
  }

   async findOne(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOneBy({id})
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find()
  }

  async updateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionRepository.findOneBy({id})
    if (!question) {
      throw new NotFoundException('Question not found')
    }

    // Update question fields based on updateQuestionDto
    Object.assign(question, updateQuestionDto)

    return this.questionRepository.save(question)
  }
}
