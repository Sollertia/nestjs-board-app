import { Injectable } from '@nestjs/common';
import { BoardReqDto } from './dto/board.req.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  getBoards(user: User): Promise<Board[]> {
    return this.boardRepository.getBoards(user);
  }

  createBoard(reqDto: BoardReqDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(reqDto, user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoardById(id: number, user: User): Promise<void> {
    return this.boardRepository.deleteBoardById(id, user);
  }

  updateBoardStatus(
    id: number,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status, user);
  }
}
