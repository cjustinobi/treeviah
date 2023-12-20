import { AuthService } from './auth.service'
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql'
import { UserRegisterInput } from './input/user-register.input'
import { UserLoginInput, LoginResponse } from './input/user-login.input'
import { UnauthorizedException } from '@nestjs/common'

@Resolver((of) => UserRegisterInput)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: UserLoginInput
  ): Promise<{ accessToken: string; user: any }> {
    try {
      const { accessToken, user } = await this.authService.login(loginInput)

      return { accessToken, user }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  @Mutation(() => UserRegisterInput, { name: 'register' })
  async registerUser(
    @Args('registerInput') userRegisterInput: UserRegisterInput
  ) {
    return this.authService.register(userRegisterInput)
  }

  @Mutation(() => Boolean)
  async logout(@Context() context): Promise<boolean> {
    const { authorization } = context.req.headers
    const token = authorization.replace('Bearer ', '')

    try {
      this.authService.logout(token)
      return true
    } catch (error) {
      console.log(error)
    }
  }
}
