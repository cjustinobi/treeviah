import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { NotFoundException } from '@nestjs/common'

export interface AuthRepository extends Repository<User> {
  this: Repository<User>
  register(data)
  validateUserPassword({ email, password })
  userExists({ email })
  findByEmail(email)
}

export const CustomAuthRepository: Pick<AuthRepository, any> = {
  async register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto> {
    const { password } = registerUserDto

    const salt = await bcrypt.genSalt()

    registerUserDto.salt = salt
    registerUserDto.password = await hashPassWord(password, salt)

    return this.save(registerUserDto)
  },

  async validateUserPassword(loginUserDto: LoginUserDto): Promise<boolean> {
    const { email, password } = loginUserDto

    try {
      const found = await this.findOneBy({ email })
      return await comparePassword(password, found.password)
    } catch (error) {
      console.log(`User with email: ${email} not found`)
    }
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  },
}

// TODO: Move to helper class

const hashPassWord = (password: any, salt: any) => {
  return bcrypt.hash(password, salt)
}

const comparePassword = async (plaintextPassword, hash) => {
  return await bcrypt.compare(plaintextPassword, hash)
}
