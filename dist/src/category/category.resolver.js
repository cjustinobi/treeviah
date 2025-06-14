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
exports.CategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guards_1 = require("../common/guards");
const category_service_1 = require("./category.service");
const category_input_1 = require("./input/category.input");
const update_category_input_1 = require("./input/update-category.input");
let CategoryResolver = class CategoryResolver {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async category(id) {
        return this.categoryService.findOne(id);
    }
    async categories() {
        return this.categoryService.findAll();
    }
    async create(input) {
        return this.categoryService.create(input);
    }
    async updateCategory(id, input) {
        return this.categoryService.update(id, input);
    }
    async deleteCategory(id) {
        await this.categoryService.delete(id);
        return true;
    }
};
exports.CategoryResolver = CategoryResolver;
__decorate([
    (0, graphql_1.Query)(() => category_input_1.CreateCategoryInput, { nullable: true, name: 'getCategory' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
__decorate([
    (0, graphql_1.Query)(() => [category_input_1.CreateCategoryInput], { name: 'getCategories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_input_1.CreateCategoryInput, { name: 'createCategory' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_input_1.CreateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_input_1.CreateCategoryInput),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_input_1.UpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
exports.CategoryResolver = CategoryResolver = __decorate([
    (0, graphql_1.Resolver)(of => category_input_1.CreateCategoryInput),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryResolver);
//# sourceMappingURL=category.resolver.js.map