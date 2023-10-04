import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { QuizParticipant } from './entities/quiz-participant.entity';

@Injectable()
export class QuizParticipantService {
  constructor(
    @InjectRepository(QuizParticipant)
    private readonly quizParticipantRepository: Repository<QuizParticipant>,
  ) {}

  async getQuizParticipantsBySocketId(socketId: string): Promise<QuizParticipant[]> {
    return this.quizParticipantRepository.find({
      where: { socketId }
    });
  }
}
