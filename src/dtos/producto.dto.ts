import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

import { IProducto, UnidadMedida } from '@/common/interfaces';

export class CreateProductDto implements IProducto {
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsEnum(UnidadMedida)
  unidadMedida: UnidadMedida;

  @IsNumber()
  stock: number;

  @IsNumber()
  @ApiProperty()
  categoriaId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
