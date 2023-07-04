import { Producto } from '../../entities/producto.entity';
import { AppDataSource } from '../data-source';
// import { createInterface } from 'readline';
// import { createReadStream } from "fs";
import { generateManyProductos } from '../random/product.random';

export const insertProductos = async () => {
  const productoRepo = AppDataSource.getRepository(Producto);
  // const file = createInterface(createReadStream('src/database/csv/product.csv'))

  const productos = generateManyProductos(20);

  await productoRepo.insert(productos);

  // file.on("line",async (line) => {
  //     const [name,categoria_id] = line.split(",")
  //     productos.push({name, categoria: {id: categoria_id }});
  // })

  // file.on("close", async () => {
  //     console.log(productos);
  //     await AppDataSource.createQueryBuilder()
  //         .insert()
  //         .into(Producto)
  //         .values(productos)
  //         .execute()

  // await AppDataSource.destroy()
  // })
};
