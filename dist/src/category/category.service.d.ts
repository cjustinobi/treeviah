import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(input: CreateCategoryDto): Promise<Category>;
    findOne(id: number): Promise<Category | undefined>;
    findAll(): Promise<Category[]>;
    update(id: number, input: UpdateCategoryDto): Promise<Category>;
    delete(id: number): Promise<void>;
}
