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
exports.LoginResponse = exports.UserLoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_response_input_1 = require("../input/user-response.input");
let UserLoginInput = class UserLoginInput {
};
exports.UserLoginInput = UserLoginInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginInput.prototype, "password", void 0);
exports.UserLoginInput = UserLoginInput = __decorate([
    (0, graphql_1.InputType)(),
    (0, graphql_1.ObjectType)('Login')
], UserLoginInput);
let LoginResponse = class LoginResponse {
};
exports.LoginResponse = LoginResponse;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_response_input_1.UserResponseInput, { nullable: true }),
    __metadata("design:type", user_response_input_1.UserResponseInput)
], LoginResponse.prototype, "user", void 0);
exports.LoginResponse = LoginResponse = __decorate([
    (0, graphql_1.ObjectType)()
], LoginResponse);
//# sourceMappingURL=user-login.input.js.map