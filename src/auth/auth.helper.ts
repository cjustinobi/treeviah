import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

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

  constructor(jwt: JwtService) {
    this.jwt = jwt
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token)
  }

  public async validateUser(email) {
    return await this.repository.findOneBy({email})
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email })
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword)
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10)

    return bcrypt.hashSync(password, salt)
  }

  async validate(token: string): Promise<boolean | never> {

    const decoded: DecodedToken = this.jwt.verify(token)

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    const user = await this.validateUser(decoded.email)
    console.log('user')
    console.log(user)

    if (!user) {
      throw new UnauthorizedException()
    }

    return true
  }
}