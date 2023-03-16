import { Module } from '@nestjs/common';
import { BoardModule } from './board/boardModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.comfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardModule],
})
export class AppModule {}
