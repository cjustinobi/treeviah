import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

import { InjectRepository } from '@nestjs/typeorm'
import { ProductRepository } from './product.repository'
import { Product } from './entities/product.entity'
import { User } from 'src/auth/entities/user.entity'
import { Repository } from 'typeorm'
import { ProductInput } from './product.input'

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    // private productsRepository: Repository<Product>
    private productsRepository: typeof ProductRepository
  ) {} 
  create(
    product: CreateProductDto,
    userId: number
    ): Promise<Product> {
    return this.productsRepository.createProduct(product, userId)
  }

  findAll(user: User): Promise<Product[]> {
    return this.productsRepository.findAll(user)
  }

  async findOne(id: number, userId: number): Promise<Product> {

    const found = await this.productsRepository.findOne(id, userId)

    if (!found) {
      throw new NotFoundException(`${id} not found`)
      
    }
    return found
  }

  async update(id: number, product: UpdateProductDto, user: User) {
    this.productsRepository.update(id, product, user)
  }

  async remove(id: number, user: User) {
    this.productsRepository.remove(id, user)
  }
}
