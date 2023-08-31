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
exports.ProductResolver = void 0;
const user_type_1 = require("../auth/user.type");
const product_input_1 = require("./product.input");
const product_service_1 = require("./product.service");
const graphql_1 = require("@nestjs/graphql");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let ProductResolver = exports.ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    async getProduct(productId, userId) {
        return this.productService.findOne(productId, userId);
    }
    async createProduct(productInput, userId) {
        return this.productService.create(productInput, userId);
    }
    async getPosts(user) {
        return user;
    }
};
__decorate([
    (0, graphql_1.Query)(returns => product_input_1.ProductInput, { name: 'product' }),
    __param(0, (0, graphql_1.Args)('productId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => product_input_1.ProductInput),
    __param(0, (0, graphql_1.Args)('productInput')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.ProductInput, Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.ResolveField)('user', returns => user_type_1.UserInput),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getPosts", null);
exports.ProductResolver = ProductResolver = __decorate([
    (0, graphql_1.Resolver)(of => product_input_1.ProductInput),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
//# sourceMappingURL=product.resolver.js.map