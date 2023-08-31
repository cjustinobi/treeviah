import { AuthService } from './auth.service';
import { UserRegisterInput } from './user-register.input';
import { UserLoginInput, SampleInput } from './user-login.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    getDummy(): Promise<SampleInput>;
    login(loginInput: UserLoginInput): Promise<string>;
    registerUser(userRegisterInput: UserRegisterInput): Promise<import("./entities/user.entity").User>;
}
