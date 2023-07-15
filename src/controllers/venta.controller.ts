import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DUser } from '@/common/decorators/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { IPayload } from '@/common/interfaces/payload.interface';
import { CreateVentaDto } from '@/dtos';
import { VentaService } from '@/services/ventas.service';

@UseGuards(JwtAuthGuard)
@Controller('venta')
export class VentaController {
  constructor(private ventaService: VentaService) {}

  @Post('')
  async createVenta(@Body() dto: CreateVentaDto, @DUser() userPayload: IPayload) {
    const venta = await this.ventaService.crearVenta(dto, userPayload.userId);
    return venta;
  }

  @Get()
  async findVentas() {
    return this.ventaService.encontrarVentas();
  }

  @Get('semana')
  async econtrarVentasDeLaSemana() {
    return this.ventaService.econtrarVentasDeLaSemana();
  }

  @Get('ventas-hoy')
  async encontrarVentasdelDia() {
    return this.ventaService.encontrarVentasdelDia();
  }

  @Get('fecha')
  async findVentasByDate(@Body() dto: { fecha: number }) {
    console.log(new Date(dto.fecha));
    return this.ventaService.encontrarVentaPorFecha(new Date(dto.fecha));
  }

  @Get(':id')
  async findOneVenta(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.encontrarUnaVenta(id);
  }

  @Get('cliente/:id')
  async ventasByCliente(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.ventasPorCliente(id);
  }

  @Delete(':id')
  eliminarVenta(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.eliminarVenta(id);
  }
}
