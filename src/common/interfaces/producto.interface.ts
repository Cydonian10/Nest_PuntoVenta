import { CategoriaEntity } from '@/entities/categoria.entity';
import { OrdenItemEntity } from '@/entities/order-item.entity';
import { ProveedorEntity } from '@/entities/proveedor.entity';

export interface IProducto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: number;
  categoria?: CategoriaEntity;
  orderItems?: OrdenItemEntity[];
  proveedores?: ProveedorEntity[];
}
