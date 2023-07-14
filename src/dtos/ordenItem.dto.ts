import { IOrdenItem } from '@/common/interfaces';
import { PartialType } from '@nestjs/swagger';

import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateOrdenItemDto implements IOrdenItem {
  @IsOptional()
  ordenId?: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;
}

export class CreateOrdenItemsDto {
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsArray()
  items: CreateOrdenItemDto[];
}

export class UpdateOrdenItemDto extends PartialType(CreateOrdenItemDto) {}
