import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async createProduct(createProductDto: CreateProductDto) {
    const { translations } = createProductDto;

    const product = await this.prisma.product.create({
      data: {
        translations: {
          create: translations,
        },
      },
      include: {
        translations: true,
      },
    });

    return product;
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { translations: true },
    });
  }

  async getProducts(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const products = await this.prisma.product.findMany({
      where: {
        translations: {
          some: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      },
      include: {
        translations: true,
      },
      skip,
      take: limit,
    });

    const totalCount = await this.prisma.product.count({
      where: {
        translations: {
          some: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      },
    });

    return {
      data: products,
      total: totalCount,
      page,
      limit,
    };
  }
}
