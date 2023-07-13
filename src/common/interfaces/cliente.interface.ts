import { OrderEntity } from '@/entities/order.entity';

export interface ICliente {
  id?: number;
  nombre: string;
  direccion: string;
  avatar: string;
  ordenes: OrderEntity[];
}
