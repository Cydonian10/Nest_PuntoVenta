import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { ProductoService } from './services/producto.service';
import { ProductController } from './controllers/producto.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    AppController,
    CategoriaController,
    ProductController,
    AuthController,
  ],
  providers: [AppService, CategoriaService, ProductoService, AuthService],
})
export class AppModule {}
