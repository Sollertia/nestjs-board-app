import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardReqDto } from './dto/board.req.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(reqDto: BoardReqDto): Promise<Board> {
    return this.boardRepository.createBoard(reqDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const findBoard = await this.boardRepository.findOne({ where: { id } });

    if (!findBoard) {
      throw new NotFoundException(`해당하는 ${id} 게시글을 찾을 수 없습니다.`);
    }

    return findBoard;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`해당하는 ${id} 게시글을 찾을 수 없습니다.`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
