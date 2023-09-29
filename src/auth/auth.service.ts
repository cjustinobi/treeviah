import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthRepository } from './auth.respository'
import { User } from './entities/user.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { AuthHelper } from './auth.helper'
import { UserResponseDto } from './dto/user-response.dto'


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) 
    private readonly authRepository: AuthRepository,
    private readonly authHelper: AuthHelper,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterUserDto): Promise<User> {
    return this.authRepository.register(data)
  }

   async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string, user: UserResponseDto }> {

    const res = await this.authRepository.validateUserPassword(loginUserDto)

    if (!res) throw new UnauthorizedException('Invalid credentials')

    const { email } = loginUserDto

  
    const userObj = await this.authRepository.findByEmail(email)
   
    let user: UserResponseDto = {
      id: userObj.id,
      fullname: userObj.fullname,
      username: userObj.username,
      email: userObj.email
    }

    const payload: JwtPayload = { email }

    const accessToken = await this.jwtService.sign(payload)

    return { accessToken, user }

  }

  async logout(accessToken: string): Promise<void> {
    this.authHelper.blackListToken(accessToken)
  }

}
