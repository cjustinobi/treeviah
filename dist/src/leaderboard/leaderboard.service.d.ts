import { Leaderboard } from './entities/leaderboard.entity';
import { Repository } from 'typeorm';
export declare class LeaderboardService {
    private readonly leaderboardRepository;
    constructor(leaderboardRepository: Repository<Leaderboard>);
    updateLeaderboard(user: any, points: number): Promise<void>;
}
