import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name es obligatorio' })
  name: string;
}

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
