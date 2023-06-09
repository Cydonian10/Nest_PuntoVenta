import { AppDataSource } from "../data-source";
import { insertCategorias } from "./categoria.seed";
import { insertProductos } from "./product.seed";

async function executeSeed() {
    await AppDataSource.initialize()
    await AppDataSource.dropDatabase()

    await insertCategorias()
    await insertProductos()    
}

executeSeed()

