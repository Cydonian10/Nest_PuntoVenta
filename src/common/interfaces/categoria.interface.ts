import { ProductoEntity } from '@/entities/producto.entity';

export interface ICategoria {
  id?: number;
  nombre: string;
  productos?: ProductoEntity[];
}
