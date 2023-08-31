import { Product } from 'src/product/entities/product.entity';
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    products: Product[];
}
