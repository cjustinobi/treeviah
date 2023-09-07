import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const dataSourceOptions: (configService: ConfigService) => Promise<TypeOrmModuleOptions>;
