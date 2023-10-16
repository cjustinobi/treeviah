import { AuthService } from './auth.service';
import { UserRegisterInput } from './input/user-register.input';
import { UserLoginInput } from './input/user-login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(loginInput: UserLoginInput): Promise<{
        accessToken: string;
        user: any;
    }>;
    registerUser(userRegisterInput: UserRegisterInput): Promise<import("./entities/user.entity").User>;
    logout(context: any): Promise<boolean>;
}
