import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthHelper } from '../../auth/auth.helper'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authHelper: AuthHelper) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const authorizationHeader = req.headers.authorization

    try {
      const token = authorizationHeader.split(' ')[1]
      const user = await this.authHelper.validate(token)

      if (!user) {
        throw new UnauthorizedException('Not Authoried to perform this action')
      }

      // Set the authenticated user in the request context
      req.user = user

      return true
    } catch (error) {
      console.log(error)
    }
  }
}
