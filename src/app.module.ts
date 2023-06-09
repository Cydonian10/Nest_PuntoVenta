import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { ProductoService } from './services/producto.service';
import { ProductController } from './controllers/producto.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController,CategoriaController,ProductController],
  providers: [AppService,CategoriaService,ProductoService],
})
export class AppModule {}
