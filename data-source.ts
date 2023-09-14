
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

// Prod
export const dataSourceOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql', // Database type
  // host: 'localhost',
  host: configService.get<string>('NODE_ENV') === 'staging' ? 'localhost' : configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  extra: {
    // socketPath: configService.get<string>('CONNECTION_NAME')
    socketPath: configService.get<string>('NODE_ENV') === 'staging' ? configService.get<string>('CONNECTION_NAME') : ''
  }
})