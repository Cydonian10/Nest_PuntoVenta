import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://root:123456@localhost:5432/db_tienda',
      entities: [...Entities],
      synchronize: false,
      migrationsRun: true,
      dropSchema: false,
      logging: false,
      ssl: false,
    }),
    TypeOrmModule.forFeature([...Entities]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
