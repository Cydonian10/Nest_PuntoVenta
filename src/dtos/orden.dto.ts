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
import { IOrden } from '@/common/interfaces';
import { ClienteEntity } from '@/entities/cliente.entity';
import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { Optional } from '@nestjs/common';

export class CreateOrdenDto implements IOrden {
  @Optional()
  usuarioId?: number;

  @IsBoolean()
  @IsNotEmpty()
  pago: boolean;

  @IsNotEmpty()
  fecha: string | Date;

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
