
import { AuthService } from './auth.service'
import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { UserRegisterInput } from './user-register.input'
import { UserLoginInput, AccessToken } from './user-login.input'
import { UnauthorizedException } from '@nestjs/common'

@Resolver(of => UserRegisterInput)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}


@Mutation(() => AccessToken)
async login(@Args('loginInput') loginInput: UserLoginInput): Promise<{accessToken: string}> {
  try {
    const { accessToken } = await this.authService.login(loginInput)

    return {accessToken} // Return the response object
  } catch (error) {
    throw new UnauthorizedException('Invalid credentials')
  }
}


 

  @Mutation(() => UserRegisterInput, {name: 'register'})
  async registerUser(@Args('registerInput') userRegisterInput: UserRegisterInput) {
    return this.authService.register(userRegisterInput)
  }
 
}