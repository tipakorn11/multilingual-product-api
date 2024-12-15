import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[PrismaModule]
})
export class ProductModule {}
