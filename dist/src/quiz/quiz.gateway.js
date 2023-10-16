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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const question_service_1 = require("./question.service");
const quiz_participant_service_1 = require("./quiz-participant.service");
const leaderboard_service_1 = require("../leaderboard/leaderboard.service");
const point_calculator_1 = require("./helpers/point-calculator");
let QuizGateway = class QuizGateway {
    constructor(questionService, quizParticipantService, leaderboardService, pointCalculator) {
        this.questionService = questionService;
        this.quizParticipantService = quizParticipantService;
        this.leaderboardService = leaderboardService;
        this.pointCalculator = pointCalculator;
        this.currentQuestionIndex = 0;
        this.timerInterval = 10000;
    }
    async fetchNextQuestionAndEmit(quizId) {
        const questions = await this.questionService.findAll();
        const questionLength = questions.length;
        if (this.currentQuestionIndex < questionLength) {
            const nextQuestion = questions[this.currentQuestionIndex];
            this.currentQuestionIndex++;
            this.server.emit('nextQuestionStarted', { question: nextQuestion, questionLength });
            await this.questionService.updateQuestionTimestamp(nextQuestion.id);
            setTimeout(() => {
                this.fetchNextQuestionAndEmit(quizId);
            }, this.timerInterval);
        }
        else {
            const result = await this.quizParticipantService.getTopThreeParticipants(quizId);
            this.server.emit('quizResult', { result });
        }
    }
    async handleSubmitAnswer(client, data) {
        const user = await this.quizParticipantService.getQuizParticipantsByUsername('menhyui');
        if (!user)
            return;
        const question = await this.questionService.findOne(data.questionId);
        if (!question)
            return;
        const isCorrect = data.answer === question.correctAnswers[0];
        const answerTimestamp = new Date();
        const timeTaken = answerTimestamp.getTime() - question.timestamp.getTime();
        const points = this.pointCalculator.calculatePoints(timeTaken, question.timer);
        await this.leaderboardService.updateLeaderboard(user, points);
        this.server.emit('answerResult', {
            username: user,
            isCorrect,
            timeTaken
        });
    }
};
exports.QuizGateway = QuizGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], QuizGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('nextQuestion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "fetchNextQuestionAndEmit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('submitAnswer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "handleSubmitAnswer", null);
exports.QuizGateway = QuizGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [question_service_1.QuestionService,
        quiz_participant_service_1.QuizParticipantService,
        leaderboard_service_1.LeaderboardService,
        point_calculator_1.PointCalculator])
], QuizGateway);
//# sourceMappingURL=quiz.gateway.js.map