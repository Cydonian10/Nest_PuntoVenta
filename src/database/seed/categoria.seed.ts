import { CategoriaEntity } from '@/entities/categoria.entity';
import { AppDataSource } from '../data-source';
import { generateManyCategorias } from '../random/category.random';

export const insertCategorias = async () => {
  const categoriaRepo = AppDataSource.getRepository(CategoriaEntity);

  const categorias = generateManyCategorias();

  await categoriaRepo.insert(categorias);
};
