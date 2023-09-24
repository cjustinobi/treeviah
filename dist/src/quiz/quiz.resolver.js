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
exports.QuizResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const quiz_service_1 = require("./quiz.service");
const quiz_input_1 = require("./input/quiz.input");
const quiz_category_input_1 = require("./quiz-category.input");
const common_1 = require("@nestjs/common");
const guards_1 = require("../common/guards");
const quiz_gateway_1 = require("./quiz.gateway");
const quiz_participant_entity_1 = require("./entities/quiz-participant.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const join_quiz_input_1 = require("./input/join-quiz.input");
let QuizResolver = class QuizResolver {
    constructor(quizService, quizGateway, quizParticipantRepository) {
        this.quizService = quizService;
        this.quizGateway = quizGateway;
        this.quizParticipantRepository = quizParticipantRepository;
    }
    async findAll() {
        return this.quizService.findAll();
    }
    async findOne(id) {
        return this.quizService.findOne(id);
    }
    async getQuizzesByCategory(categoryId) {
        return this.quizService.getQuizzesByCategory(categoryId);
    }
    async create(input) {
        const quiz = await this.quizService.createQuiz(input);
        return quiz;
    }
    async update(id, input) {
        return this.quizService.updateQuiz(id, input);
    }
    async assignQuizToCategory(input) {
        const { quizId, categoryId } = input;
        return await this.quizService.assignQuizToCategory(quizId, categoryId);
    }
    async startQuiz(id) {
        const quiz = await this.quizService.findOne(id);
        if (quiz.status === 'Not Started') {
            quiz.status = 'In Progress';
            quiz.code = 'thecode';
            await this.quizService.updateQuiz(id, quiz);
            this.quizGateway.server.emit('quizStarted', { quiz });
            return quiz;
        }
        else {
            throw new Error('Quiz is already in progress or completed.');
        }
    }
    async joinQuiz(input) {
        const { quizId, socketId, username } = input;
        const quiz = await this.quizService.findOne(quizId);
        if (quiz.status === 'In Progress') {
            if (!quiz.participants.some((participant) => participant.socketId === socketId)) {
                const newParticipant = new quiz_participant_entity_1.QuizParticipant();
                newParticipant.socketId = socketId;
                newParticipant.username = username;
                await this.quizParticipantRepository.save(newParticipant);
                quiz.participants.push(newParticipant);
                await this.quizService.updateQuiz(quizId, quiz);
                this.quizGateway.server.emit('userJoined', { quizId, socketId });
                return quiz;
            }
            else {
                throw new Error('User is already a participant in this quiz.');
            }
        }
        else {
            throw new Error('Quiz is not in progress or has been completed.');
        }
    }
};
exports.QuizResolver = QuizResolver;
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => [quiz_input_1.CreateQuizInput], { name: 'getQuizzes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Query)(returns => quiz_input_1.CreateQuizInput, { name: 'getQuiz' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [quiz_input_1.CreateQuizInput]),
    __param(0, (0, graphql_1.Args)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "getQuizzesByCategory", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => quiz_input_1.CreateQuizInput, { name: 'createQuiz' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quiz_input_1.CreateQuizInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(returns => quiz_input_1.CreateQuizInput, { name: 'updateQuiz' }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quiz_input_1.CreateQuizInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => quiz_input_1.CreateQuizInput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quiz_category_input_1.AssignQuizToCategoryInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "assignQuizToCategory", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => quiz_input_1.CreateQuizInput),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "startQuiz", null);
__decorate([
    (0, graphql_1.Mutation)(() => quiz_input_1.CreateQuizInput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_quiz_input_1.JoinQuizInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "joinQuiz", null);
exports.QuizResolver = QuizResolver = __decorate([
    (0, graphql_1.Resolver)(of => quiz_input_1.CreateQuizInput),
    __param(2, (0, typeorm_2.InjectRepository)(quiz_participant_entity_1.QuizParticipant)),
    __metadata("design:paramtypes", [quiz_service_1.QuizService,
        quiz_gateway_1.QuizGateway,
        typeorm_1.Repository])
], QuizResolver);
//# sourceMappingURL=quiz.resolver.js.map