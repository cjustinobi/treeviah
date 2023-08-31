import { ProductInput } from 'src/product/product.input';
export declare class UserInput {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    salt: string;
    password: string;
    products: ProductInput[];
}
