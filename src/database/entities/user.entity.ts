import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { EntityBase } from './base-entity';
import { IUser } from '../../shared/interfaces/user.interface';
import { hash } from 'bcrypt';
import { Rol } from './rol.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityBase implements IUser {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', unique: true })
  dni: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ManyToMany(() => Rol)
  @JoinTable({
    name: 'user_x_rol',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  roles: Rol[];

  @OneToMany(() => Order, (o) => o.user)
  ordenes: Order[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
