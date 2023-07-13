import { OrdenItemEntity } from '@/entities/order-item.entity';
import { OrderEntity } from '@/entities/order.entity';

import { AppDataSource } from '../data-source';
import { generateManyVentas } from '../random/venta.random';

export const insertVentas = async () => {
  const orderRepository = AppDataSource.getRepository(OrderEntity);
  const orderItemRepository = AppDataSource.getRepository(OrdenItemEntity);

  const ventas = generateManyVentas();

  for (let index = 0; index < ventas.length; index++) {
    const newOrder = orderRepository.create({ ...ventas[index].orden, usuarioId: 2 });

    const resp = await orderRepository.save(newOrder);

    let items: OrdenItemEntity[] = [];

    for (let i = 0; i < ventas[index].items.length; i++) {
      const item = orderItemRepository.create({
        productId: ventas[index].items[i].productId,
        cantidad: ventas[index].items[i].quantity,
        ordenId: resp.id,
      });
      items.push(item);
    }

    await orderItemRepository.save(items);
    items = [];
  }
};
