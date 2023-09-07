import { AuthRepository } from './auth.respository';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from './auth.helper';
export declare class AuthService {
    private readonly authRepository;
    private readonly authHelper;
    private jwtService;
    constructor(authRepository: AuthRepository, authHelper: AuthHelper, jwtService: JwtService);
    register(data: RegisterUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    logout(accessToken: string): Promise<void>;
}
