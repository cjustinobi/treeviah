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
const quiz_input_1 = require("./quiz.input");
const common_1 = require("@nestjs/common");
const guards_1 = require("../common/guards");
let QuizResolver = exports.QuizResolver = class QuizResolver {
    constructor(quizService) {
        this.quizService = quizService;
    }
    async findAll() {
        return this.quizService.findAll();
    }
    async findOne(id) {
        return this.quizService.findOne(id);
    }
    async create(input) {
        return this.quizService.createQuiz(input);
    }
    async update(id, input) {
        return this.quizService.updateQuiz(id, input);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [quiz_input_1.CreateQuizInput], { name: 'getQuizzes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(returns => quiz_input_1.CreateQuizInput, { name: 'getQuiz' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(returns => quiz_input_1.CreateQuizInput, { name: 'createQuiz' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quiz_input_1.CreateQuizInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)(returns => quiz_input_1.CreateQuizInput, { name: 'updateQuiz' }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, quiz_input_1.CreateQuizInput]),
    __metadata("design:returntype", Promise)
], QuizResolver.prototype, "update", null);
exports.QuizResolver = QuizResolver = __decorate([
    (0, graphql_1.Resolver)(of => quiz_input_1.CreateQuizInput),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizResolver);
//# sourceMappingURL=quiz.resolver.js.map