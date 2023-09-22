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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
const user_entity_1 = require("../auth/entities/user.entity");
var QuestionFormat;
(function (QuestionFormat) {
    QuestionFormat["MULTIPLE_CHOICE"] = "multiple-choice";
    QuestionFormat["BOOLEAN"] = "boolean";
    QuestionFormat["PUZZLE"] = "puzzle";
    QuestionFormat["TYPE_ANSWER"] = "type-answer";
})(QuestionFormat || (QuestionFormat = {}));
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "mediaUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['multiple-choice', 'boolean', 'puzzle', 'type-answer']
    }),
    __metadata("design:type", String)
], Question.prototype, "format", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], Question.prototype, "correctAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true, comment: 'This works in tandem when the format is multiple choice' }),
    __metadata("design:type", Boolean)
], Question.prototype, "multipleAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'In seconds' }),
    __metadata("design:type", Number)
], Question.prototype, "timer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['standard', 'double', 'no-point'], default: 'standard' }),
    __metadata("design:type", String)
], Question.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.questions),
    __metadata("design:type", quiz_entity_1.Quiz)
], Question.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.questions),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "user", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)()
], Question);
//# sourceMappingURL=question.entity.js.map