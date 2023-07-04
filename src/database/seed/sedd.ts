import { AppDataSource } from '../data-source';
import { insertCategorias } from './categoria.seed';
import { insertProductos } from './product.seed';

async function executeSeed() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.synchronize();

    await insertCategorias();
    await insertProductos();

    await AppDataSource.destroy();
  } catch (error) {
    console.log(error);
  }
}

executeSeed();
