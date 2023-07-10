import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IProducto } from '../interfaces/user.interface';

export class CreateProductDto implements IProducto {
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  @ApiProperty()
  categoriaId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
