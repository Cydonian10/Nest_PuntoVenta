import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateOrdenItemDto } from './ordenItem.dto';

export class CreateOrdenDto {
  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;

  @IsNotEmpty()
  fecha: Date;

  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class CreateVentaDto {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateOrdenDto)
  orden: CreateOrdenDto;

  @ValidateNested()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => CreateOrdenItemDto)
  items: CreateOrdenItemDto[];
}
