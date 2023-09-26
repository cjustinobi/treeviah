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
exports.QuestionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_service_1 = require("./question.service");
const question_input_1 = require("./input/question.input");
const common_1 = require("@nestjs/common");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
let currentQuestionIndex = 0;
let QuestionResolver = class QuestionResolver {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getNextQuestion() {
        const questions = await this.questionService.findAll();
        if (currentQuestionIndex < questions.length) {
            const nextQuestion = questions[currentQuestionIndex];
            currentQuestionIndex++;
            return nextQuestion;
        }
    }
    async createQuestion(input, user) {
        return this.questionService.createQuestion(input, user);
    }
    async findOne(id) {
        return this.questionService.findOne(id);
    }
    async findAll() {
        return this.questionService.findAll();
    }
    async update(id, input, user) {
        return this.questionService.update(id, input, user);
    }
    async delete(id) {
        try {
            await this.questionService.delete(id);
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.QuestionResolver = QuestionResolver;
__decorate([
    (0, graphql_1.Query)(returns => question_input_1.CreateQuestionInput, { name: 'getNextQuestion' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "getNextQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(returns => question_input_1.CreateQuestionInput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, decorators_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [question_input_1.CreateQuestionInput, Object]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "createQuestion", null);
__decorate([
    (0, graphql_1.Query)(returns => question_input_1.CreateQuestionInput, { name: 'getQuestion' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(returns => [question_input_1.CreateQuestionInput], { name: 'getQuestions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => question_input_1.CreateQuestionInput, { name: 'updateQuestion' }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __param(2, (0, decorators_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, question_input_1.CreateQuestionInput, Object]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteQuestion' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "delete", null);
exports.QuestionResolver = QuestionResolver = __decorate([
    (0, graphql_1.Resolver)(of => question_input_1.CreateQuestionInput),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionResolver);
//# sourceMappingURL=question.resolver.js.map