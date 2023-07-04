import { Producto } from '../entities/producto.entity';
import { AppDataSource } from '../data-source';
import { generateManyProductos } from '../random/product.random';

export const insertProductos = async () => {
  const productoRepo = AppDataSource.getRepository(Producto);

  const productos = generateManyProductos(20);

  await productoRepo.insert(productos);
};
