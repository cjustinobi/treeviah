
import { AuthService } from './auth.service'
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql'
import { UserRegisterInput } from './user-register.input'
import { UserLoginInput, AccessToken } from './user-login.input'
import { UnauthorizedException } from '@nestjs/common'

@Resolver(of => UserRegisterInput)
export class AuthResolver {
  constructor(
    private authService: AuthService,

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



  @Mutation(() => Boolean) // Return a boolean to indicate success
  async logout(@Context() context): Promise<boolean> {
    const { authorization } = context.req.headers; // Get the authorization header from the context
    const token = authorization.replace('Bearer ', ''); // Extract the token
    
    try {
      this.authService.logout(token)
      return true
    } catch (error) {
      console.log(error)
    }
  }
}