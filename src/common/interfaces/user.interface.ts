import { OrderEntity } from '@/entities/order.entity';
import { Rol } from '@/entities/rol.entity';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  nombre: string;
  direccion: string;
  dni: string;
  avatar: string;
  roles?: Rol[];
  ordenes?: OrderEntity[];
}
