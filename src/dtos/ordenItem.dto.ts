import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateOrdenItem {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrdenItems {
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsArray()
  items: CreateOrdenItem[];
}
