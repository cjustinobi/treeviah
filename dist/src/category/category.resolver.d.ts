import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './input/category.input';
import { UpdateCategoryInput } from './input/update-category.input';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    category(id: number): Promise<Category | undefined>;
    categories(): Promise<Category[]>;
    create(input: CreateCategoryInput): Promise<Category>;
    updateCategory(id: number, input: UpdateCategoryInput): Promise<Category>;
    deleteCategory(id: number): Promise<boolean>;
}
