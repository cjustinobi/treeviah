
import { Injectable } from '@nestjs/common'
import { Leaderboard } from './entities/leaderboard.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async updateLeaderboard(user: any, points: number): Promise<void> {
    // Find or create a leaderboard entry for the user
    let leaderboardEntry = await this.leaderboardRepository.findOne({
      where: { participant: user }
    })

    if (!leaderboardEntry) {
      leaderboardEntry = new Leaderboard()
      leaderboardEntry.participant = user
      leaderboardEntry.totalPoints = 0
    }

    leaderboardEntry.totalPoints += points

    await this.leaderboardRepository.save(leaderboardEntry)
  }
}
