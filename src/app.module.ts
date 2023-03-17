import { Module } from '@nestjs/common';
import { BoardModule } from './board/boardModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.comfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BoardModule, AuthModule],
})
export class AppModule {}
