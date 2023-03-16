import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../orm/typeorm-ex.decorator';
import { BoardReqDto } from './dto/board.req.dto';
import { BoardStatus } from './board-status.enum';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(reqDto: BoardReqDto): Promise<Board> {
    const { title, description } = reqDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
