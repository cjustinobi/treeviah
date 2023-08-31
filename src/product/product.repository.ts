
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { User } from 'src/auth/entities/user.entity'
import { NotFoundException } from '@nestjs/common'


export interface IProductRepository extends Repository<Product> {

//  this: Repository<Product>
  // createProduct(product: CreateProductDto, user: any)
  // find(user)
  
}

export const ProductRepository: Pick<IProductRepository, any> = {

  async createProduct(productDto: CreateProductDto, user): Promise<CreateProductDto> {
    productDto.user = user
    return this.save(productDto)
  },

  async findOne(id: number, userId: number){
    
    const query  = this.createQueryBuilder('product')
    query.where('product.id = :id', { id: id })
    query.andWhere('product.userId = :userId', { userId })
    return await query.getOne()
  }, 

  async findAll(user: User): Promise<Product[]>{
    const query  = this.createQueryBuilder('product')
    query.where('product.userId = :userId', { userId: user.id })
    return await query.getMany()
  },

  async update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>{

    const result = await this
      .createQueryBuilder()
      .update(Product)
      .set(updateProductDto)
      .where('product.id = :id', { id })
      .andWhere('product.userId = :userId', { userId: user.id })
      .execute()
    
    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found for this user`);
    }

    return this.findOne(id, user)
  },

    async remove(id: number, user: User){
    const result = await this
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found for this user`)
    }

  }
}