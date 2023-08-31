import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { Product } from './entities/product.entity'
import { TypeOrmModule, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { ProductRepository } from './product.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: getRepositoryToken(Product),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Product).extend(ProductRepository);
      },
    },
    ProductService
  ],
  exports: [ProductService]
})
export class ProductModule {}
