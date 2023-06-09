import { Categoria } from "../../entities/categoria.entity"
import { AppDataSource } from "../data-source"
// import { createInterface } from 'readline';
// import { createReadStream } from "fs";
import { generateManyCategorias } from "../random/category.random";


export const insertCategorias = async () => {
    const categoriaRepo = AppDataSource.getRepository(Categoria)
    // const file = createInterface(createReadStream('src/database/csv/category.csv'))

    const categorias = generateManyCategorias()

    await categoriaRepo.insert(categorias)


    // file.on("line",async (line) => {
    //     const [name] = line.split(",")
    //     categorias.push({name});
    // })

    // file.on("close", async () => {
    //     console.log(categorias);
    //    await categoriaRepo.insert(categorias)

    // })    
}

