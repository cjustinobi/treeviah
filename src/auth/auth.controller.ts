import {
  Controller,
  Post,
  Req,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { User } from './entities/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(
    @Res() response,
    @Body() body: RegisterUserDto
  ): Promise<RegisterUserDto> {
    const newUser = await this.authService.register(body)
    return response.status(HttpStatus.CREATED).json({ newUser })
  }

  @Post('login')
  // async login(@Body() body: LoginUserDto) : Promise<string> {
  async login(@Body() body: LoginUserDto): Promise<{ accessToken: string }> {
    return await this.authService.login(body)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: User) {
    console.log(user)
  }
}
