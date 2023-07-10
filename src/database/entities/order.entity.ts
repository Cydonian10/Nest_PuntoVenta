import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { OrderItem } from './order-item';
import { User } from './user.entity';
import { Cliente } from './cliente.entity';

@Entity()
export class Order extends EntityBase {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean' })
  pago: boolean;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @OneToMany(() => OrderItem, (oI) => oI.order)
  orderItems: OrderItem[];
}
