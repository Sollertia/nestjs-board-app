import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmExModule } from '../orm/typeorm.ex.module';
import { BoardRepository } from './board.repository';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
