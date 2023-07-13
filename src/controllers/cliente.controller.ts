import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClienteService } from 'src/services/cliente.service';
import { ClienteEntity } from '@/entities/cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from '../dtos/cliente.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('cliente')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Public()
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: ClienteEntity['id']) {
    const cliente = await this.clienteService.findOne(id);
    return cliente;
  }

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    const newCliente = await this.clienteService.create(dto);
    return newCliente;
  }

  @Put(':id')
  async update(@Body() dto: UpdateClienteDto, @Param('id') id: ClienteEntity['id']) {
    const clienteUpdated = await this.clienteService.update(dto, id);
    return clienteUpdated;
  }

  @Delete(':id')
  async remove(@Param('id') id: ClienteEntity['id']) {
    const idCliente = await this.clienteService.remove(id);
    return idCliente;
  }
}
