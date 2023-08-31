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
exports.ProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("../auth/user.type");
let ProductInput = exports.ProductInput = class ProductInput {
};
__decorate([
    (0, graphql_1.Field)(type => graphql_1.ID),
    __metadata("design:type", Number)
], ProductInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProductInput.prototype, "desc", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(type => user_type_1.UserInput, { nullable: true }),
    __metadata("design:type", user_type_1.UserInput)
], ProductInput.prototype, "user", void 0);
exports.ProductInput = ProductInput = __decorate([
    (0, graphql_1.InputType)(),
    (0, graphql_1.ObjectType)('Product')
], ProductInput);
//# sourceMappingURL=product.input.js.map