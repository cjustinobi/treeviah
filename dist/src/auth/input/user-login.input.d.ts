import { UserResponseInput } from '../input/user-response.input';
export declare class UserLoginInput {
    email: string;
    password: string;
}
export declare class LoginResponse {
    accessToken: string;
    user?: UserResponseInput;
}
