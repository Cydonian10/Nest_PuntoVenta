import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateVentaDto } from 'src/dtos/orden.dto';
import { OrdenService } from 'src/services/orden.service';
import { DUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { IPayload } from '../shared/interfaces/auth/payload.interface';

@UseGuards(JwtAuthGuard)
@Controller('orden')
export class OrdenController {
  constructor(private ordenService: OrdenService) {}

  @Post('venta')
  async createVenta(@Body() dto: CreateVentaDto, @DUser() userPayload: IPayload) {
    console.log(userPayload);
    const venta = await this.ordenService.createVenta(dto, userPayload.userId);
    return venta;
  }

  @Get()
  async findVentas() {
    return this.ordenService.findVentas();
  }

  @Get('fecha')
  async findVentasByDate(@Body() dto: { fecha: Date }) {
    return this.ordenService.findVentasByDate(dto.fecha);
  }

  @Get(':id')
  async findOneVenta(@Param('id', ParseIntPipe) id: number) {
    return this.ordenService.findOneVenta(id);
  }

  @Get('cliente/:id')
  async ventasByCliente(@Param('id', ParseIntPipe) id: number) {
    return this.ordenService.ventasByCliente(id);
  }
}