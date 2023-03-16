import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { BoardReqDto } from './dto/board.req.dto';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getBoards(): Board[] {
    return this.boards;
  }

  createBoard(reqDto: BoardReqDto): Board {
    const { title, description } = reqDto;

    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const findBoard = this.boards.find((board) => board.id === id);

    if (!findBoard) {
      throw new NotFoundException(`해당하는 ${id} 게시글을 찾을 수 없습니다.`);
    }

    return findBoard;
  }

  deleteBoardById(id: string): void {
    const findBoard = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board?.id !== findBoard?.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    console.log();
    return board;
  }
}
