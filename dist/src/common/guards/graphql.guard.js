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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_helper_1 = require("../../auth/auth.helper");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authHelper) {
        this.authHelper = authHelper;
    }
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const authorizationHeader = req.headers.authorization;
        try {
            const token = authorizationHeader.split(' ')[1];
            const user = await this.authHelper.validate(token);
            if (!user) {
                throw new common_1.UnauthorizedException('Not Authoried to perform this action');
            }
            req.user = user;
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_helper_1.AuthHelper])
], JwtAuthGuard);
//# sourceMappingURL=graphql.guard.js.map