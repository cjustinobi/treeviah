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
exports.QuizParticipantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_participant_entity_1 = require("./entities/quiz-participant.entity");
const leaderboard_entity_1 = require("./entities/leaderboard.entity");
let QuizParticipantService = class QuizParticipantService {
    constructor(quizParticipantRepository, leaderboardRepository) {
        this.quizParticipantRepository = quizParticipantRepository;
        this.leaderboardRepository = leaderboardRepository;
    }
    async getQuizParticipantsBySocketId(socketId) {
        return this.quizParticipantRepository.findOne({
            where: { socketId }
        });
    }
    async getQuizParticipantsByUsername(username) {
        return this.quizParticipantRepository.findOne({
            where: { username }
        });
    }
    async getTopThreeParticipants(quizId) {
        const leaderboardEntries = await this.leaderboardRepository.find({
            where: {
                participant: {
                    quiz: { id: quizId },
                },
            },
            order: {
                totalPoints: 'DESC',
            },
            take: 3,
            relations: ['participant', 'participant.quiz'],
        });
        return leaderboardEntries;
    }
};
exports.QuizParticipantService = QuizParticipantService;
exports.QuizParticipantService = QuizParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_participant_entity_1.QuizParticipant)),
    __param(1, (0, typeorm_1.InjectRepository)(leaderboard_entity_1.Leaderboard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuizParticipantService);
//# sourceMappingURL=quiz-participant.service.js.map