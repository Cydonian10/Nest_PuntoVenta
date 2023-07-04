import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryColumn({ name: 'producto_id' })
  productId: number;

  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  item: Producto;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
