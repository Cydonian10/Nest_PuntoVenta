import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { OrderItem } from './order-item';
import { User } from './user.entity';

@Entity()
export class Order extends EntityBase {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean' })
  pago: boolean;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'order_id' })
  user: User;

  @OneToMany(() => OrderItem, (oI) => oI.order)
  orderItems: OrderItem[];
}
