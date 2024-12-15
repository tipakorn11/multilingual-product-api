import { IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductTranslationDto {
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  translations: ProductTranslationDto[];
}
