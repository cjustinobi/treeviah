import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryService {
    create(createCategoryInput: CreateCategoryInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCategoryInput: UpdateCategoryInput): string;
    remove(id: number): string;
}
