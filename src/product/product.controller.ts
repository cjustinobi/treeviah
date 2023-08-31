import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Res() response, 
    @Body() body: CreateProductDto,
    @GetUser() user: User
    ) : Promise<CreateProductDto> {
    const newProduct = await this.productService.create(body, user.id)
    return response.status(HttpStatus.CREATED).json({newProduct})
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.productService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number, 
    @GetUser() user: User
    ): Promise<Product> {
    return this.productService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
    ) {
    return this.productService.update(id, updateProductDto, user)
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ) {
    return this.productService.remove(id, user)
  }
}
