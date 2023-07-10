import { Body, Controller, Post } from '@nestjs/common';
import { CreateRolDto } from 'src/dtos/rol.dto';
import { RolService } from 'src/services/rol.service';

@Controller('rol')
export class RolController {
  constructor(private rolService: RolService) {}

  @Post()
  async crear(@Body() dto: CreateRolDto) {
    const newRol = await this.rolService.crear(dto);
    return newRol;
  }
}
