import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './jwt-payload.interface'

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>

  private readonly jwt: JwtService

  private readonly tokenBlacklist: Set<string> = new Set<string>()

  constructor(jwt: JwtService) {
    this.jwt = jwt
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token)
  }

  public async validateUser(email) {
    return await this.repository.findOneBy({email})
  }

  public async generateToken(email): Promise<string> {
    const payload: JwtPayload = { email }

    return await this.jwt.sign(payload)
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword)
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
  }

  async validate(token: string) {

    if (this.tokenBlacklist.has(token)) return false

    const decoded: DecodedToken = this.jwt.verify(token)

    if (!decoded) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    const user = await this.validateUser(decoded.email)

    if (!user) throw new UnauthorizedException()

    return user
  }

  async blackListToken(accessToken: string): Promise<void> {
    this.tokenBlacklist.add(accessToken)
  }
}