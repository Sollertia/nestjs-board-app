import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board, BoardStatus } from './board.model';
import { BoardReqDto } from './dto/board.req.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/get-all')
  getBoards(): Board[] {
    return this.boardService.getBoards();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(@Body() reqDto: BoardReqDto): Board {
    return this.boardService.createBoard(reqDto);
  }

  @Get('/get')
  getBoardByIdQuery(@Query('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Get('/:id')
  getBoardByIdParam(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  }
}
