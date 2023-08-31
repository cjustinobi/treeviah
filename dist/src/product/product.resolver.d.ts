import { ProductInput } from './product.input';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    getProduct(productId: number, userId: number): Promise<import("./entities/product.entity").Product>;
    createProduct(productInput: ProductInput, userId: number): Promise<import("./entities/product.entity").Product>;
    getPosts(user: any): Promise<any>;
}
