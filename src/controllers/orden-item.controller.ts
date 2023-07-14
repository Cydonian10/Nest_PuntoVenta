import { Body, Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { OrdenItemnService } from '../services/orden-item.service';
import { UpdateOrdenItemDto } from '@/dtos';

@Controller('orden-item')
export class OrdenItemController {
  constructor(private ordenItemService: OrdenItemnService) {}

  @Delete(':id')
  eliminarOrdenItem(@Param('id') id: number) {
    return this.ordenItemService.eliminarOrdenItem(id);
  }

  @Put(':id')
  actulizarOrdenItem(@Body() dto: UpdateOrdenItemDto, @Param('id', ParseIntPipe) id: number) {
    console.log(dto);
    return this.ordenItemService.actulizarOrdenItem(dto, id);
  }
}
