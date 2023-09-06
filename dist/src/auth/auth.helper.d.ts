import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
export declare class AuthHelper {
    private readonly repository;
    private readonly jwt;
    private readonly tokenBlacklist;
    constructor(jwt: JwtService);
    decode(token: string): Promise<unknown>;
    validateUser(email: any): Promise<User>;
    generateToken(email: any): Promise<string>;
    isPasswordValid(password: string, userPassword: string): boolean;
    encodePassword(password: string): string;
    validate(token: string): Promise<boolean | never>;
    blackListToken(accessToken: string): Promise<void>;
}
