"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const cors = require("cors");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const data_source_1 = require("../data-source");
const auth_module_1 = require("./auth/auth.module");
const quiz_module_1 = require("./quiz/quiz.module");
const category_module_1 = require("./category/category.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../config/configuration");
const auth_resolver_1 = require("./auth/auth.resolver");
const question_resolver_1 = require("./quiz/question.resolver");
const quiz_resolver_1 = require("./quiz/quiz.resolver");
const category_resolver_1 = require("./category/category.resolver");
const quiz_gateway_1 = require("./quiz/quiz.gateway");
const quiz_participant_entity_1 = require("./quiz/entities/quiz-participant.entity");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer.apply(cors()).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default]
            }),
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([quiz_participant_entity_1.QuizParticipant]),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: data_source_1.dataSourceOptions,
                inject: [config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                buildSchemaOptions: {
                    numberScalarMode: 'integer'
                },
                subscriptions: {
                    'graphql-ws': true
                },
            }),
            quiz_module_1.QuizModule,
            category_module_1.CategoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            auth_resolver_1.AuthResolver,
            quiz_resolver_1.QuizResolver,
            question_resolver_1.QuestionResolver,
            category_resolver_1.CategoryResolver,
            quiz_gateway_1.QuizGateway
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map