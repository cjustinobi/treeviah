import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(response: any, body: RegisterUserDto): Promise<RegisterUserDto>;
    login(body: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    test(user: User): Promise<void>;
}
