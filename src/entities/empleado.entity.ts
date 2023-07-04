import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { EntityBase } from './base-entity';
import { EmpleadoRol } from '../interfaces/rol.enum';

@Entity()
export class Empleado extends EntityBase {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  dni: string;

  @Column({ type: 'enum', enum: EmpleadoRol, default: EmpleadoRol.seller })
  rol: EmpleadoRol;

  @OneToOne(() => User, (u) => u.cliente, { onDelete: 'CASCADE' })
  user: User;
}
