import { CategoriaEntity } from '@/entities/categoria.entity';
import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { ProveedorEntity } from '@/entities/proveedor.entity';

export enum UnidadMedida {
  'unidades' = 'unidades',
  'kilogramo' = 'kilogramo',
}

export interface IProducto {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  unidadeMedida: UnidadMedida;
  categoriaId: number;
  categoria?: CategoriaEntity;
  orderItems?: OrdenItemEntity[];
  proveedores?: ProveedorEntity[];
}
