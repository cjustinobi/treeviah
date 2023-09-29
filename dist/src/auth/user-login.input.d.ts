import { UserResponseDto } from './dto/user-response.dto';
export declare class UserLoginInput {
    email: string;
    password: string;
}
export declare class AccessToken {
    accessToken: string;
    user?: UserResponseDto;
}
