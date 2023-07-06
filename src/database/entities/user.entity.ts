import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { IUser } from '../../interfaces/user.interface';
import { hash } from 'bcrypt';
import { Rol } from './rol.entity';

@Entity()
export class User extends EntityBase implements IUser {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar' })
  dni: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @ManyToMany(() => Rol)
  @JoinTable({
    name: 'user_x_rol',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  roles: Rol[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}