import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { OrdenEntity } from '@/entities/orden.entity';
import { CreateVentaDto } from '@/dtos';

import { AppDataSource } from '../data-source';

function generateNumberRandom(max: number, min: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateOneVenta(): CreateVentaDto {
  return {
    items: [
      { productId: generateNumberRandom(8, 5), cantidad: generateNumberRandom(4, 2) },
      { productId: generateNumberRandom(5, 1), cantidad: generateNumberRandom(4, 2) },
    ],
    orden: {
      pago: true,
      fecha: new Date().toString(),
      clienteId: Math.floor(Math.random() * (5 - 1) + 1),
      total: 200,
    },
  };
}

function generateManyVentas(size = 10) {
  const ventas: CreateVentaDto[] = [];

  for (let index = 0; index <= size - 1; index++) {
    ventas.push(generateOneVenta());
  }

  return ventas;
}

export const insertVentas = async () => {
  const orderRepository = AppDataSource.getRepository(OrdenEntity);
  const orderItemRepository = AppDataSource.getRepository(OrdenItemEntity);

  const ventas = generateManyVentas();

  for (let index = 0; index < ventas.length; index++) {
    const newOrder = orderRepository.create({
      ...ventas[index].orden,
      fecha: new Date(ventas[index].orden.fecha),
      usuarioId: 2,
    });

    const resp = await orderRepository.save(newOrder);

    let items: OrdenItemEntity[] = [];

    for (let i = 0; i < ventas[index].items.length; i++) {
      const item = orderItemRepository.create({
        productId: ventas[index].items[i].productId,
        cantidad: ventas[index].items[i].cantidad,
        ordenId: resp.id,
      });
      items.push(item);
    }

    await orderItemRepository.save(items);
    items = [];
  }
};
