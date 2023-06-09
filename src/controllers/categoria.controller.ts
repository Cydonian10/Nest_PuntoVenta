import { Controller, Get } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller("categoria")
export class CategoriaController {
    constructor(private categoriaSrv:CategoriaService){}

    @Get()
    getAll(): Promise<Categoria[]> {
        return this.categoriaSrv.getAll()
    }
}