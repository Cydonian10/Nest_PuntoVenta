import { Column, Entity, ManyToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { User } from './user.entity';

@Entity()
export class Rol extends EntityBase {
  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => User)
  users: User[];
}
