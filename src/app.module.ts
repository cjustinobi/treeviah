import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { dataSourceOptions } from 'data-source'
import { AuthModule } from './auth/auth.module'
import { User } from './auth/entities/user.entity'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../config/configuration'
import { AuthResolver } from './auth/auth.resolver'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AuthModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      useFactory: dataSourceOptions,
      inject: [ConfigService], // Inject ConfigService
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer'
      },
      subscriptions: {
        'graphql-ws': true
      },
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthResolver
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
