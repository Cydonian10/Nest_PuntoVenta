import { OrdenEntity } from '@/entities/orden.entity';
import { ProductoEntity } from '@/entities/producto.entity';

export interface IOrdenItem {
  id?: number;
  productId: number;
  ordenId?: number;
  cantidad: number;
  item?: ProductoEntity;
  orden?: OrdenEntity;
}
