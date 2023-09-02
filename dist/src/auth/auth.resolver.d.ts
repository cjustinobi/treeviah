import { AuthService } from './auth.service';
import { UserRegisterInput } from './user-register.input';
import { UserLoginInput } from './user-login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(loginInput: UserLoginInput): Promise<{
        accessToken: string;
    }>;
    registerUser(userRegisterInput: UserRegisterInput): Promise<import("./entities/user.entity").User>;
}
