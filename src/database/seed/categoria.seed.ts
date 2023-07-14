import { CategoriaEntity } from '@/entities/categoria.entity';
import { AppDataSource } from '../data-source';
import { CreateCategoriaDto } from '@/dtos';

const categoriasArray: string[] = ['soldadura', 'pernos', 'otros', 'piedras', 'liquidos'];

function generateOneCategory(positon: number): CreateCategoriaDto {
  return {
    nombre: categoriasArray[positon],
  };
}

function generateManyCategorias(size = 5) {
  const categorias = [];
  for (let index = 0; index <= size - 1; index++) {
    categorias.push(generateOneCategory(index));
  }

  return categorias;
}

export const insertCategorias = async () => {
  const categoriaRepo = AppDataSource.getRepository(CategoriaEntity);

  const categorias = generateManyCategorias();

  await categoriaRepo.insert(categorias);
};
