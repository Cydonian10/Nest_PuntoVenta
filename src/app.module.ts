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
import { UserService } from './services/user.service';
import { RolService } from './services/rol.service';
import { RolController } from './controllers/rol.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/strategies/jwt-strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: '123', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [
    AppController,
    CategoriaController,
    ProductController,
    AuthController,
    RolController,
  ],
  providers: [
    AppService,
    CategoriaService,
    ProductoService,
    AuthService,
    UserService,
    RolService,
    JwtStrategy,
  ],
})
export class AppModule {}
