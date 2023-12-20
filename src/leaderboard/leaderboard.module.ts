import { Module } from '@nestjs/common'
import { LeaderboardService } from './leaderboard.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Leaderboard } from './entities/leaderboard.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Leaderboard])],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
