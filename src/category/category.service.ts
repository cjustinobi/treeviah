import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(input: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(input)
    return this.categoryRepository.save(category)
  }

  async findOne(id: number): Promise<Category | undefined> {
    return this.categoryRepository.findOneBy({ id })
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async update(id: number, input: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    Object.assign(category, input)

    return this.categoryRepository.save(category)
  }

  async delete(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    await this.categoryRepository.remove(category)
  }
}
