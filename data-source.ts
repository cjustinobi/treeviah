
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const dataSourceOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql', // Database type
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  // extra: {
  //   socketPath: configService.get<string>('CONNECTION_NAME')
  // }
})

// DATABASE_URL="postgresql://zuser:pass@localhost/db?host=/cloudsql/projectis:us-central1:db"