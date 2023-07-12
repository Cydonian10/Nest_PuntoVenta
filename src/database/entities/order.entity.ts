import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';
import { Cliente } from './cliente.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Order extends EntityBase {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean' })
  pago: boolean;

  @Column({ type: 'date' })
  fecha: Date;

  @Exclude()
  @Column({ name: 'user_id' })
  userId: number;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Exclude()
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Exclude()
  @OneToMany(() => OrderItem, (oI) => oI.order)
  orderItems: OrderItem[];

  @Expose()
  get datosCliente() {
    return {
      nombre: this.cliente.nombre,
      dirección: this.cliente.direccion,
    };
  }

  @Expose()
  get nombreVendedor() {
    return this.user.nombre;
  }

  @Expose()
  get items() {
    return this.orderItems.map((item) => {
      const { precio, nombre } = item.item;
      return {
        quantity: item.quantity,
        precio,
        nombre,
      };
    });
  }
}
