import { CreateCategoriaDto } from "../../dtos/categoria.dto";

const categoriasArray :string[] = ["soldadura","pernos","otros","piedras","liquidos"]

export function generateOneCategory (positon:number) : CreateCategoriaDto {
    return {
        name: categoriasArray[positon]
    }
}

export function generateManyCategorias (size = 5) { 
    const categorias:CreateCategoriaDto[] = []
    for (let index = 0; index <= size - 1; index++) {
        categorias.push( generateOneCategory(index) )        
    }

    return categorias
}