import { Column, Entity, OneToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { Order } from './order.entity';

@Entity()
export class Cliente extends EntityBase {
  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => Order, (o) => o.cliente)
  ordenes: Order[];
}
