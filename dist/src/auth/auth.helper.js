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
exports.AuthHelper = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let AuthHelper = class AuthHelper {
    constructor(jwt) {
        this.tokenBlacklist = new Set();
        this.jwt = jwt;
    }
    async decode(token) {
        return this.jwt.decode(token);
    }
    async validateUser(email) {
        return await this.repository.findOneBy({ email });
    }
    async generateToken(email) {
        const payload = { email };
        return await this.jwt.sign(payload);
    }
    isPasswordValid(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }
    encodePassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    async validate(token) {
        if (this.tokenBlacklist.has(token))
            return false;
        const decoded = this.jwt.verify(token);
        if (!decoded)
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        const user = await this.validateUser(decoded.email);
        if (!user)
            throw new common_1.UnauthorizedException();
        return user;
    }
    async blackListToken(accessToken) {
        this.tokenBlacklist.add(accessToken);
    }
};
exports.AuthHelper = AuthHelper;
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], AuthHelper.prototype, "repository", void 0);
exports.AuthHelper = AuthHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthHelper);
//# sourceMappingURL=auth.helper.js.map