import { ProductoEntity } from '@/entities/producto.entity';

export interface IProveedor {
  id?: number;
  nombre: string;
  telefono: string;
  image: string;
  sitioweb: string;
  productos?: ProductoEntity[];
}
