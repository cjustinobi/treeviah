import { User } from 'src/auth/entities/user.entity';
export declare class Product {
    id: number;
    title: string;
    desc: string;
    price: number;
    user: User;
}
