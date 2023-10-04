"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("./quiz.service");
const question_service_1 = require("./question.service");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const question_entity_1 = require("./entities/question.entity");
const category_entity_1 = require("../category/entities/category.entity");
const helpers_1 = require("./helpers");
const quiz_participant_service_1 = require("./quiz-participant.service");
const quiz_participant_entity_1 = require("./entities/quiz-participant.entity");
let QuizModule = class QuizModule {
};
exports.QuizModule = QuizModule;
exports.QuizModule = QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([quiz_entity_1.Quiz, question_entity_1.Question, category_entity_1.Category, quiz_participant_entity_1.QuizParticipant])],
        providers: [quiz_service_1.QuizService, question_service_1.QuestionService, helpers_1.CodeGenerator, quiz_participant_service_1.QuizParticipantService],
        exports: [quiz_service_1.QuizService, question_service_1.QuestionService, helpers_1.CodeGenerator, quiz_participant_service_1.QuizParticipantService]
    })
], QuizModule);
//# sourceMappingURL=quiz.module.js.map