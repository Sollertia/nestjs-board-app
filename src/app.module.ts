import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.Module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.comfig';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BoardModule,
    AuthModule,
  ],
  exports: [ConfigModule], // 다른 모듈에서도 사용할 수 있게 export
})
export class AppModule {}
