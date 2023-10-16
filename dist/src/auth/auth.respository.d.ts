import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export interface AuthRepository extends Repository<User> {
    this: Repository<User>;
    register(data: any): any;
    validateUserPassword({ email, password }: {
        email: any;
        password: any;
    }): any;
    userExists({ email }: {
        email: any;
    }): any;
    findByEmail(email: any): any;
}
export declare const CustomAuthRepository: Pick<AuthRepository, any>;
