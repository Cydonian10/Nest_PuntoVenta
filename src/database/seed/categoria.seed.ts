import { Categoria } from "../../entities/categoria.entity"
import { AppDataSource } from "../data-source"
import { createInterface } from 'readline';
import { createReadStream } from "fs";


export const insertCategorias = async () => {
    const categoriaRepo = AppDataSource.getRepository(Categoria)
    const file = createInterface(createReadStream('src/database/csv/category.csv'))

    const categorias :Categoria[] = []

    file.on("line",async (line) => {
        const [name] = line.split(",")
        categorias.push({name});
    })

    file.on("close", async () => {
        console.log(categorias);
       await categoriaRepo.insert(categorias)

    })    
}

