import { faker } from '@faker-js/faker';
import { ProductoEntity } from '@/entities/producto.entity';

import { CreateProductDto } from '@/dtos';

import { UnidadMedida } from '@/common/interfaces';

import { AppDataSource } from '../data-source';

export function generateOneProduct(): CreateProductDto {
  return {
    nombre: faker.commerce.product(),
    precio: Math.floor(Math.random() * (100 - 20) + 20),
    categoriaId: Math.floor(Math.random() * (5 - 1) + 1),
    stock: Math.floor(Math.random() * (40 - 20) + 20),
    unidadMedida: UnidadMedida.unidades,
  };
}

export function generateManyProductos(size = 10) {
  const products = [];

  for (let index = 0; index <= size - 1; index++) {
    products.push(generateOneProduct());
  }

  return products;
}

export const insertProductos = async () => {
  const productoRepo = AppDataSource.getRepository(ProductoEntity);

  const productos = generateManyProductos(20);

  await productoRepo.insert(productos);
};
