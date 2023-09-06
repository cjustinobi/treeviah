"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dataSourceOptions = async (configService) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseOptions = {
        type: 'mysql',
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
    };
    if (isProduction) {
        return {
            ...baseOptions,
            host: 'localhost',
            port: configService.get('DB_PORT'),
            extra: {
                socketPath: configService.get('CONNECTION_NAME'),
            },
        };
    }
    else {
        return {
            ...baseOptions,
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
        };
    }
};
exports.dataSourceOptions = dataSourceOptions;
//# sourceMappingURL=data-source.js.map