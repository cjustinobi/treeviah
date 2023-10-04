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
let QuizGateway = class QuizGateway {
    constructor(questionService, quizParticipantService) {
        this.questionService = questionService;
        this.quizParticipantService = quizParticipantService;
        this.currentQuestionIndex = 0;
        this.timerInterval = 10000;
    }
    async fetchNextQuestionAndEmit(quizId) {
        const questions = await this.questionService.findAll();
        if (this.currentQuestionIndex < questions.length) {
            const nextQuestion = questions[this.currentQuestionIndex];
            this.currentQuestionIndex++;
            this.server.emit('nextQuestion', { question: nextQuestion });
            setTimeout(() => {
                this.fetchNextQuestionAndEmit(quizId);
            }, this.timerInterval);
        }
    }
    handleJoinQuiz(client, quizId) {
        client.join(`quiz-${quizId}`);
        this.server.emit('userJoined', { quizId, userId: client.id });
    }
    async handleSubmitAnswer(client, questionId, answer) {
        const user = await this.quizParticipantService.getQuizParticipantsBySocketId(client.id);
        console.log('ffhf');
        console.log(user);
        const question = await this.questionService.findOne(questionId);
        if (!question) {
            return;
        }
        const isCorrect = answer === question.correctAnswers[0];
        const answerTimestamp = new Date();
        const timeTaken = answerTimestamp.getTime() - question.timestamp.getTime();
        this.server.to(`quiz-${question.quiz.id}`).emit('answerResult', {
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
    (0, websockets_1.SubscribeMessage)('nQuestion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "fetchNextQuestionAndEmit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinQuiz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], QuizGateway.prototype, "handleJoinQuiz", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('submitAnswer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number, String]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "handleSubmitAnswer", null);
exports.QuizGateway = QuizGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [question_service_1.QuestionService,
        quiz_participant_service_1.QuizParticipantService])
], QuizGateway);
//# sourceMappingURL=quiz.gateway.js.map