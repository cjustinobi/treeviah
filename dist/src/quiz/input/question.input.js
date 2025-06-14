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
exports.CreateQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateQuestionInput = class CreateQuestionInput {
};
exports.CreateQuestionInput = CreateQuestionInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "mediaUrl", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Select any of these: [multiple-choice, boolean, puzzle, type-answer]' }),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "format", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateQuestionInput.prototype, "options", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateQuestionInput.prototype, "correctAnswers", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], CreateQuestionInput.prototype, "multipleAnswers", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateQuestionInput.prototype, "timer", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Select any of these: [standard, double, no-point]' }),
    __metadata("design:type", String)
], CreateQuestionInput.prototype, "point", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Enter the ID of the quiz' }),
    __metadata("design:type", Number)
], CreateQuestionInput.prototype, "quiz", void 0);
exports.CreateQuestionInput = CreateQuestionInput = __decorate([
    (0, graphql_1.InputType)(),
    (0, graphql_1.ObjectType)('Question')
], CreateQuestionInput);
//# sourceMappingURL=question.input.js.map