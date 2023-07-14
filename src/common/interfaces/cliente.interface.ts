import { OrdenEntity } from '@/entities/orden.entity';

export interface ICliente {
  id?: number;
  nombre: string;
  direccion: string;
  avatar: string;
  ordenes: OrdenEntity[];
}
