import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(response: any, body: CreateProductDto, user: User): Promise<CreateProductDto>;
    findAll(user: User): Promise<Product[]>;
    findOne(id: number, user: User): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<void>;
    remove(id: number, user: User): Promise<void>;
}
