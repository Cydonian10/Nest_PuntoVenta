import { AppDataSource } from '../data-source';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { generateManyVentas } from '../random/venta.random';

export const insertVentas = async () => {
  const orderRepository = AppDataSource.getRepository(Order);
  const orderItemRepository = AppDataSource.getRepository(OrderItem);

  const ventas = generateManyVentas();

  for (let index = 0; index < ventas.length; index++) {
    const newOrder = orderRepository.create({ ...ventas[index].orden, userId: 2 });

    const resp = await orderRepository.save(newOrder);

    let items: OrderItem[] = [];

    for (let i = 0; i < ventas[index].items.length; i++) {
      const item = orderItemRepository.create({
        productId: ventas[index].items[i].productId,
        quantity: ventas[index].items[i].quantity,
        orderId: resp.id,
      });
      items.push(item);
    }

    await orderItemRepository.save(items);
    items = [];
  }
};
