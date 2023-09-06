import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthHelper } from '../../auth/auth.helper';
export declare class JwtAuthGuard implements CanActivate {
    private readonly authHelper;
    constructor(authHelper: AuthHelper);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
