import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CategoriaService } from './services/categoria.service';
import { CategoriaController } from './controllers/categoria.controller';
import { ProductoService } from './services/producto.service';
import { ProductController } from './controllers/producto.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RolService } from './services/rol.service';
import { RolController } from './controllers/rol.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/strategies/jwt-strategy';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';
import { OrdenService } from './services/orden.service';
import { OrdenController } from './controllers/orden.controller';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: '123', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [
    CategoriaController,
    ProductController,
    AuthController,
    RolController,
    ClienteController,
    OrdenController,
  ],
  providers: [
    CategoriaService,
    ProductoService,
    AuthService,
    UserService,
    RolService,
    JwtStrategy,
    ClienteService,
    OrdenService,
  ],
})
export class AppModule {}
