
// import { UserInput } from 'src/auth/user.type'
import { AuthService } from './auth.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
// import { GetUser } from 'src/auth/get-user.decorator'
import { UserRegisterInput } from './user-register.input'
import { UserLoginInput, SampleInput } from './user-login.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(of => UserRegisterInput)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Query(returns => SampleInput)
  async getDummy() {
const dummy: SampleInput = {
    test: 'Hello'
  };
  return dummy;
  }


//   @Mutation(() => UserLoginInput, {name: 'login'})
//   async loginUser(@Args('loginInput') userLoginInput: UserLoginInput) {
//     const authenticatedUser = await this.authService.login(userLoginInput) 
  
//    if (!authenticatedUser) {
//     throw new Error('Authentication failed');
//   }
// console.log(authenticatedUser)
//     return authenticatedUser
//   }

@Mutation(() => UserLoginInput, {name: 'login'})
// @Mutation(() => AuthResponseType) // AuthResponseType is a custom GraphQL type
async login(@Args('loginInput') loginInput: UserLoginInput): Promise<string> {
  try {
    const { accessToken } = await this.authService.login(loginInput);

    // Here you can implement your service's login method

    return accessToken // Return the response object
  } catch (error) {
    throw new UnauthorizedException('Invalid credentials');
  }
}


 

  @Mutation(() => UserRegisterInput, {name: 'register'})
  async registerUser(@Args('registerInput') userRegisterInput: UserRegisterInput) {
    return this.authService.register(userRegisterInput)
  }
 
}