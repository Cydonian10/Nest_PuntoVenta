import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriaEntity } from '@/entities/categoria.entity';
import { CategoriaService } from '../services/categoria.service';
import { CreateCategoriaDto } from '../dtos/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaSrv: CategoriaService) {}

  @Get()
  getAll(): Promise<CategoriaEntity[]> {
    return this.categoriaSrv.getAll();
  }

  @Post()
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriaSrv.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaSrv.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCategoriaDto) {
    return this.categoriaSrv.update(dto, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const idCategory = await this.categoriaSrv.remove(id);
    return {
      id: idCategory,
    };
  }
}
