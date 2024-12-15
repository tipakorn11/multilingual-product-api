import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  createProduct(
    @Body(new ValidationPipe({ whitelist: true })) createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }
  @Get()
  async getProducts(
    @Query('search') search: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    // Default values for page and limit
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    return this.productService.getProducts(search || '', pageNumber, limitNumber);
  }
}
