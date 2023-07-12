import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../database/entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from '../database/entities/order-item.entity';
import { CreateVentaDto } from '../dtos/orden.dto';
import { Cliente } from 'src/database/entities/cliente.entity';

@Injectable()
export class OrdenService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order) private ordenRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private ordenItemRepository: Repository<OrderItem>,
  ) {}

  async createVenta(dto: CreateVentaDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newOrden = queryRunner.manager.create(Order, {
        ...dto.orden,
        userId: userId,
      });

      const resp = await queryRunner.manager.save(Order, newOrden);

      const items: OrderItem[] = [];

      for (let i = 0; i < dto.items.length; i++) {
        const item1 = queryRunner.manager.create(OrderItem, {
          productId: dto.items[i].productId,
          quantity: dto.items[i].quantity,
          orderId: resp.id,
        });
        items.push(item1);
      }

      await queryRunner.manager.insert(OrderItem, items);

      await queryRunner.commitTransaction();

      return { orderId: resp.id };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findVentas() {
    return this.ordenRepository.find({
      relations: { cliente: true, user: true, orderItems: { item: true } },
    });
  }

  async ventasByCliente(id: Cliente['id']) {
    const ventas = await this.ordenRepository.find({
      where: { clienteId: id },
      relations: { cliente: true, user: true, orderItems: { item: true } },
    });

    return ventas;
  }

  async findOneVenta(idVenta: Order['id']) {
    const ventas = await this.ordenRepository.findOne({
      where: { id: idVenta },
      relations: { cliente: true, user: true, orderItems: { item: true } },
    });

    return ventas;
  }

  async findVentasByDate(fecha: Date) {
    const ventas = await this.ordenRepository.find({
      where: { fecha },
    });

    return ventas;
  }
}
