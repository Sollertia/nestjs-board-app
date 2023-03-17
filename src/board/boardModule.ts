import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmExModule } from '../orm/typeorm.ex.module';
import { BoardRepository } from './board.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
