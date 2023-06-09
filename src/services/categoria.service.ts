import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoriaService {

    constructor(@InjectRepository(Categoria) private readonly categoriaRepo:Repository<Categoria>) {}

    getAll() : Promise<Categoria[]> {
        return this.categoriaRepo.find()
    }

    search(id:Categoria["id"]) :Promise<Categoria> {
        const categoria = this.categoriaRepo.findOne({where:{id}})

        if( !categoria ) {
            throw new NotFoundException("Error")
        }

        return categoria
    }
}