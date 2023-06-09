import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductoService } from '../services/producto.service';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from '@/dtos/producto.dto';

@Controller('producto')
export class ProductController {
  constructor(private productSrv: ProductoService) {}

  @Get()
  getAll(@Query() params: FilterProductDto) {
    console.log(params);
    return this.productSrv.getAll(params);
  }

  @Get('categoria/:id')
  async getAllByCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.productSrv.getAllByCategoria(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productSrv.findOne(id);
  }

  @Post()
  crate(@Body() dto: CreateProductDto) {
    return this.productSrv.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productSrv.update(dto, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const productId = await this.productSrv.remove(id);
    return { id: productId };
  }
}
