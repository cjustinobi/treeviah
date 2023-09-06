import { JwtPayload } from './jwt-payload.interface';
import { AuthRepository } from './auth.respository';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    private configService;
    constructor(authRepository: AuthRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
