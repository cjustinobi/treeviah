import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { QuizParticipant } from './entities/quiz-participant.entity'
import { Leaderboard } from './entities/leaderboard.entity'

@Injectable()
export class QuizParticipantService {
  constructor(
    @InjectRepository(QuizParticipant)
    private readonly quizParticipantRepository: Repository<QuizParticipant>,
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>
  ) {}

  async getQuizParticipantsBySocketId(
    socketId: string
  ): Promise<QuizParticipant> {
    return this.quizParticipantRepository.findOne({
      where: { socketId },
    })
  }

  async getQuizParticipantsByUsername(
    username: string
  ): Promise<QuizParticipant> {
    return this.quizParticipantRepository.findOne({
      where: { username },
    })
  }

  async getTopThreeParticipants(quizId: number): Promise<Leaderboard[]> {
    const leaderboardEntries = await this.leaderboardRepository.find({
      where: {
        participant: {
          quiz: { id: quizId }, // Filter by quiz id
        },
      },
      order: {
        totalPoints: 'DESC', // Sort by total points in descending order
      },
      take: 3, // Get the top three entries
      relations: ['participant', 'participant.quiz'], // Specify relations
    })

    return leaderboardEntries
  }
}
