import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class ProductService {
    private productsRepository;
    constructor(productsRepository: typeof ProductRepository);
    create(product: CreateProductDto, userId: number): Promise<Product>;
    findAll(user: User): Promise<Product[]>;
    findOne(id: number, userId: number): Promise<Product>;
    update(id: number, product: UpdateProductDto, user: User): Promise<void>;
    remove(id: number, user: User): Promise<void>;
}
