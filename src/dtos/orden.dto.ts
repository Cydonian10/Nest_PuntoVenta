import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateOrdenItem } from './ordenItem.dto';
import { Type } from 'class-transformer';

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
  @Type(() => CreateOrdenItem)
  items: CreateOrdenItem[];
}
