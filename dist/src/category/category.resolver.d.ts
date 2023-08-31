import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(createCategoryInput: CreateCategoryInput): string;
    findAll(): string;
    findOne(id: number): string;
    updateCategory(updateCategoryInput: UpdateCategoryInput): string;
    removeCategory(id: number): string;
}
