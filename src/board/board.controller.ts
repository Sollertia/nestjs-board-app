import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.model';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/get-all')
  getBoards(): Board[] {
    return this.boardService.getBoards();
  }

  @Post('/create')
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardService.createBoard(title, description);
  }
}
