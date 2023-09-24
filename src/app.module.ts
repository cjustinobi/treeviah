import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import * as cors from 'cors'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { dataSourceOptions } from 'data-source'
import { AuthModule } from './auth/auth.module'
import { QuizModule } from './quiz/quiz.module'
import { CategoryModule } from './category/category.module'
import { GraphQLModule } from '@nestjs/graphql'
import { User } from './auth/entities/user.entity'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../config/configuration'
import { AuthResolver } from './auth/auth.resolver'
import { QuestionResolver } from './quiz/question.resolver'
import { QuizResolver } from './quiz/quiz.resolver'
import { CategoryResolver } from './category/category.resolver'
import { QuizGateway } from './quiz/quiz.gateway'
import { QuizParticipant } from './quiz/entities/quiz-participant.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AuthModule,
    // TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([QuizParticipant]),
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
    }),
    QuizModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthResolver,
    QuizResolver,
    QuestionResolver,
    CategoryResolver,
    QuizGateway
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*')
  }
}
