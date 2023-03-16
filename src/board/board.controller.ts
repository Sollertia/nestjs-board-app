import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { BoardReqDto } from './dto/board.req.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/get-all')
  getBoards(): Board[] {
    return this.boardService.getBoards();
  }

  @Post('/create')
  createBoard(@Body() reqDto: BoardReqDto): Board {
    return this.boardService.createBoard(reqDto);
  }
}
