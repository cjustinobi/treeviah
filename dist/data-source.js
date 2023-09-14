"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dataSourceOptions = async (configService) => {
    const isProduction = process.env.NODE_ENV === 'staging';
    const prod = {
        type: 'mysql',
        host: 'localhost',
        port: configService.get('DB_PORT'),
        extra: {
            socketPath: configService.get('CONNECTION_NAME')
        },
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
    };
    const dev = {
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
    };
    if (true) {
        return prod;
    }
    else {
        return dev;
    }
};
exports.dataSourceOptions = dataSourceOptions;
//# sourceMappingURL=data-source.js.map