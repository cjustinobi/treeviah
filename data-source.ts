
// import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { ConfigService } from '@nestjs/config'

// // Prod
// export const dataSourceOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
//   type: 'mysql', // Database type
//   host: 'localhost',
//   port: configService.get<number>('DB_PORT'),
//   username: configService.get<string>('DB_USERNAME'),
//   password: configService.get<string>('DB_PASSWORD'),
//   database: configService.get<string>('DB_DATABASE'),
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   logging: true,
//   extra: {
//     socketPath: configService.get<string>('CONNECTION_NAME')
//   }
// })


import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const dataSourceOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {

  const isProduction = process.env.NODE_ENV === 'production'
  // const isProduction = configService.get<string>('NODE_ENV') === 'production'


  // const baseOptions: TypeOrmModuleOptions = {
  //   type: 'mysql', // Database type
  // host: configService.get<string>('DB_HOST'),
  //   port: configService.get<number>('DB_PORT'),
  //   username: configService.get<string>('DB_USERNAME'),
  //   password: configService.get<string>('DB_PASSWORD'),
  //   database: configService.get<string>('DB_DATABASE'),
  //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //   synchronize: true,
  //   logging: true,
  // }

  // if (isProduction) {
  //   return {
  //     ...baseOptions,
  //     host: 'localhost',
  //     port: configService.get<number>('DB_PORT'),
  //     extra: {
  //       socketPath: configService.get<string>('CONNECTION_NAME')
  //     },
  //   }
  // } else {
  //   return {
  //     ...baseOptions,
  //     port: configService.get<number>('DB_PORT')
  //   }
  // }


  const prod: TypeOrmModuleOptions = {
    type: 'mysql', // Database type
    host: 'localhost',
    port: configService.get<number>('DB_PORT'),
    extra: {
      socketPath: configService.get<string>('CONNECTION_NAME')
    },
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }

  const dev: TypeOrmModuleOptions = {
    type: 'mysql', // Database type
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }

  if(isProduction) {
    return prod
  } else {
    return dev
  }
};
