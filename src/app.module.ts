import { Module } from '@nestjs/common';
import { BoardMoudle } from './board/board.moudle';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.comfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardMoudle],
})
export class AppModule {}
