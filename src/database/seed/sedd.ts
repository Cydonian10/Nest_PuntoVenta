import { AppDataSource } from '../data-source';
import { insertCategorias } from './categoria.seed';
import { insertProductos } from './product.seed';
import { inserRoles } from './rol.seed';

async function executeSeed() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.synchronize();

    await inserRoles();
    await insertCategorias();
    await insertProductos();

    console.log('Seed complete 🌱');

    await AppDataSource.destroy();
  } catch (error) {
    console.log(error);
  }
}

executeSeed();
