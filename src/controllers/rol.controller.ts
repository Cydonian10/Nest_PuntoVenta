import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RolService } from '../services/rol.service';
import { CreateRolDto, UpdateRolDto } from '../dtos/rol.dto';
import { Rol } from '../database/entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}

  @Get()
  async getAll() {
    const roles = await this.rolService.getAll();
    return roles;
  }

  @Post()
  async crear(@Body() dto: CreateRolDto) {
    const newRol = await this.rolService.crear(dto);
    return newRol;
  }

  @Put(':id')
  async update(
    @Body() dto: UpdateRolDto,
    @Param('id', ParseIntPipe) id: Rol['id'],
  ) {
    const rolUpdate = await this.rolService.update(dto, id);
    return rolUpdate;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: Rol['id']) {
    const idRol = await this.rolService.remove(id);
    return idRol;
  }
}
