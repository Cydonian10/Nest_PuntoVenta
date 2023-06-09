import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './data-source';
import { Entities } from '../entities';

@Global()
@Module({
    imports:[
        TypeOrmModule.forRoot({...DataSourceConfig}),
        TypeOrmModule.forFeature([...Entities])
    ],
    exports:[
        TypeOrmModule
    ]
})
export class DatabaseModule {}
