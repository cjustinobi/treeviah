"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dataSourceOptions = async (configService) => ({
    type: 'mysql',
    host: configService.get('NODE_ENV') === 'staging' ? 'mysql://treeviah:treeviah@db4free.net:3306/treeviah' : configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
});
exports.dataSourceOptions = dataSourceOptions;
//# sourceMappingURL=data-source.js.map