import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
export interface IProductRepository extends Repository<Product> {
}
export declare const ProductRepository: Pick<IProductRepository, any>;
