"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const product_entity_1 = require("./entities/product.entity");
const common_1 = require("@nestjs/common");
exports.ProductRepository = {
    async createProduct(productDto, user) {
        productDto.user = user;
        return this.save(productDto);
    },
    async findOne(id, userId) {
        const query = this.createQueryBuilder('product');
        query.where('product.id = :id', { id: id });
        query.andWhere('product.userId = :userId', { userId });
        return await query.getOne();
    },
    async findAll(user) {
        const query = this.createQueryBuilder('product');
        query.where('product.userId = :userId', { userId: user.id });
        return await query.getMany();
    },
    async update(id, updateProductDto, user) {
        const result = await this
            .createQueryBuilder()
            .update(product_entity_1.Product)
            .set(updateProductDto)
            .where('product.id = :id', { id })
            .andWhere('product.userId = :userId', { userId: user.id })
            .execute();
        if (!result.affected) {
            throw new common_1.NotFoundException(`Product with id ${id} not found for this user`);
        }
        return this.findOne(id, user);
    },
    async remove(id, user) {
        const result = await this
            .createQueryBuilder()
            .delete()
            .from(product_entity_1.Product)
            .where('id = :id', { id })
            .andWhere('userId = :userId', { userId: user.id })
            .execute();
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${id} not found for this user`);
        }
    }
};
//# sourceMappingURL=product.repository.js.map