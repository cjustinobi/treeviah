"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const leaderboard_entity_1 = require("./entities/leaderboard.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let LeaderboardService = class LeaderboardService {
    constructor(leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
    }
    async updateLeaderboard(user, points) {
        let leaderboardEntry = await this.leaderboardRepository.findOne({
            where: { participant: user }
        });
        if (!leaderboardEntry) {
            leaderboardEntry = new leaderboard_entity_1.Leaderboard();
            leaderboardEntry.participant = user;
            leaderboardEntry.totalPoints = 0;
        }
        leaderboardEntry.totalPoints += points;
        await this.leaderboardRepository.save(leaderboardEntry);
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(leaderboard_entity_1.Leaderboard)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map