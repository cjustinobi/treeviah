
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateQuestionDto } from './dto/create-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { Question } from './entities/question.entity'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto, user: User): Promise<Question> {
 
    const question = this.questionRepository.create(createQuestionDto)
    return this.questionRepository.save({...question, user})
  }

   async findOne(id: number): Promise<Question | undefined> {
    return await this.questionRepository
  .createQueryBuilder('question')
  .where('question.id = :id', { id })
  .leftJoinAndSelect('question.quiz', 'quiz')
  .getOne()

    // return this.questionRepository.findOneBy({id})
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find()
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
    user: User
  ): Promise<Question> {
    const question = await this.questionRepository.findOneBy({id})
    if (!question) {
      throw new NotFoundException('Question not found')
    }

    Object.assign(question, {...updateQuestionDto, user})

    return this.questionRepository.save(question)
  }

  async delete(id: number): Promise<void> {
    const question = await this.questionRepository.findOneBy({id})
    if (!question) {
      throw new NotFoundException('Question not found')
    }

    await this.questionRepository.remove(question)
  }

  async updateQuestionTimestamp(id: number): Promise<Question> {
    const question = await this.questionRepository.findOneBy({id})

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    question.timestamp = new Date()
    return this.questionRepository.save(question);
  }
}
