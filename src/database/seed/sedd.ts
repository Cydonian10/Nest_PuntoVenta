import { AppDataSource } from '../data-source';
import { insertCategorias } from './categoria.seed';
import { insertClientes } from './cliente.seed';
import { insertProductos } from './product.seed';
import { inserRoles } from './rol.seed';
import { insertUsuarios } from './usuario.seed';
import { insertVentas } from './venta.seed';

async function executeSeed() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.dropDatabase();
    await AppDataSource.runMigrations();

    await inserRoles();
    await insertUsuarios();
    await insertClientes();
    await insertCategorias();
    await insertProductos();
    await insertVentas();

    console.log('Seed complete 🌱');

    await AppDataSource.destroy();
  } catch (error) {
    console.log(error);
  }
}

executeSeed();
